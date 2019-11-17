import React, { ReactElement, useEffect, useState } from 'react'
import { findMiddleFrame, imageDiffMatrix } from '../functions'

export type directionFunction = (frameNumber: number) => 'forward' | 'reverse'
export type directionType = directionFunction | 'similarity' | 'forward' | 'reverse'
export type flickerFunction = (frameNumber: number) => boolean

interface IProps {
  frames: string[] // TODO: All projects, separate alphabetized required props from optionals
  name: string

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

let diffs: number[]

function FlipBook({
  frames,
  name,

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

  if (propsDirection === 'similarity') {
    useEffect(() => {
      let projectorInterval: number

      if (!diffs) {
        (async function getDiffs() {
          try {
            // TODO: URL base should come from ENV
            const res = await fetch(`http://hem.rocks/studio-assets/films/frames/${name}/diff.json`)
            diffs = (await res.json()).map(parseFloat)
            run()
          }

          catch(err) {
            console.log(err)
            console.log(`I can't find the diff for ${name}; I will make one for you`)
            console.log(await JSON.stringify(imageDiffMatrix(frames)))
          }
        }())
      }

      else {
        run()
      }

      function run() {
        projectorInterval = window.setTimeout(() => {
          const sortedDiffs: number[] = ([] as any).concat(diffs).sort()
          const myDiff = diffs[frameNumber] // TODO: What if ––unlikely, but–– two frames have the same difference score??
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
          console.log(diffs.indexOf(nextDiff))
          setFrameNumber(diffs.indexOf(nextDiff))
        }, frameRate * 12)
      }

      return function destroy() {
        clearTimeout(projectorInterval)
      }
    }, [frameNumber])
  }

  else {
    useEffect(() => {
      if (!playing) return

      const direction = typeof propsDirection === 'function' ? propsDirection(frameNumber) : propsDirection

      if (direction === 'forward') {
        if (!loop && frameNumber >= loopEnd) return
      }

      else {
        if (!loop && frameNumber <= startFrame) return
      }

      const projectorInterval = setTimeout(() => {
        if (direction === 'forward') {
          setFrameNumber(frameNumber > loopEnd ? startFrame : frameNumber + 1)
        }

        else {
          setFrameNumber(frameNumber > startFrame ? frameNumber - 1 : loopEnd)
        }
      }, frameRate * 12)

      return function destroy() {
        clearTimeout(projectorInterval)
      }
    }, [frameNumber, playing])
  }

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
