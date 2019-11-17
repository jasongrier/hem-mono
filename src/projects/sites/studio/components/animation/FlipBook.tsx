import React, { ReactElement, useEffect, useState } from 'react'
import { findMiddleFrame } from '../functions'
import { useClock } from '../../seurat/hooks'

export type directionFunction = (frameNumber: number) => 'forward' | 'reverse'
export type directionType = directionFunction | 'similarity' | 'forward' | 'reverse'
export type flickerFunction = (frameNumber: number) => boolean

interface IProps {
  frames: string[] // TODO: All projects, separate alphabetized required props from optionals

  diff?: number[]
  direction?: directionType
  endFrame?: number
  flickerMax?: number
  flickerMin?: number
  flickerThreshold?: flickerFunction | number
  frameRate?: number
  loop?: boolean
  playing?: boolean
  startFrame?: number
  styleFunction?: (frameNumber: number) => any
}

let proxyFrameNumber: number

function FlipBook({
  frames,

  diff,
  direction: propsDirection = 'forward',
  endFrame,
  flickerMax = 1,
  flickerMin = 0,
  flickerThreshold = 1,
  frameRate = 6, // TODO: Should be "speed" ––or rather, "slowness"–– not "frameRate"
  loop = true,
  playing = true,
  startFrame = 0,
  styleFunction = () => {},
}: IProps): ReactElement {
  const loopEnd = endFrame || frames.length - 2

  const [frameNumber, setFrameNumber] = useState(
    propsDirection === 'similarity'
      ? findMiddleFrame(frames)
      : startFrame
  )

  if (diff && propsDirection === 'similarity') {
    useClock(frameRate, () => {
      if (!playing) return

      const sortedDiffs: number[] = ([] as any).concat(diff).sort()
      const myDiff = diff[frameNumber] // TODO: What if ––unlikely, but–– two frames have the same difference score??
      const myDiffIndex = sortedDiffs.indexOf(myDiff) // TODO: What if ––unlikely, but–– myDiffIndex === -1??

      const possibleNextDiffs: number[] = []
      let low
      let high

      if (myDiffIndex < 3) {
        low = 0
        high = 5
      }

      else if (myDiffIndex > sortedDiffs.length - 1) {
        low = sortedDiffs.length - 7
        high = sortedDiffs.length - 1
      }

      else {
        low = myDiffIndex
        high = myDiffIndex + 6
      }

      for (let i = low; i < high; i ++) {
        possibleNextDiffs.push(sortedDiffs[i])
      }

      const pickIndex = Math.floor(Math.random() * 5)
      const nextDiff = possibleNextDiffs[pickIndex]
      setFrameNumber(diff.indexOf(nextDiff))
    })
  }

  else {
    useClock(frameRate, () => {
      if (!playing) return

      const direction = typeof propsDirection === 'function' ? propsDirection(proxyFrameNumber) : propsDirection

      if (direction === 'forward') {
        if (!loop && proxyFrameNumber >= loopEnd) return
        setFrameNumber(proxyFrameNumber > loopEnd ? startFrame : proxyFrameNumber + 1)
      }

      else {
        if (!loop && proxyFrameNumber <= startFrame) return
        setFrameNumber(proxyFrameNumber > startFrame ? proxyFrameNumber - 1 : loopEnd)
      }
    })
  }

  useEffect(() => { proxyFrameNumber = frameNumber }, [frameNumber])

  const opacity = typeof flickerThreshold === 'number' ?
    Math.random() < flickerThreshold ?
      flickerMax
    : flickerMin
      : flickerThreshold(frameNumber)

  return (
    <div
      className="flip-book"
      style={{ position: 'relative' }}
    >
      {frames.map((src, myFrameNumber) => (
        <img
          key={src}
          src={src}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: frameNumber === myFrameNumber ? opacity : 0,
            ...styleFunction(frameNumber)
          }}
        />
      ))}
    </div>
  )
}

export default FlipBook
