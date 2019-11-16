import React, { ReactElement, useEffect, useState } from 'react'

export type flickerFunction = (frameNumber: number) => boolean
export type directionFunction = (frameNumber: number) => 'forward' | 'reverse'

interface IProps {
  frames: string[] // TODO: All projects, separate alphabetized required props from optionals

  direction?: directionFunction | 'forward' | 'reverse'
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

function FlipBook({
  frames,

  direction: propsDirection = 'forward',
  endFrame,
  flickerMax = 1,
  flickerMin = 0,
  flickerThreshold = 1,
  frameRate = 6, // TODO: Make this truly fps not some weird fudge factor
  loop = true,
  playing = true,
  startFrame = 0,
  styleFunction = () => {},
}: IProps): ReactElement {
  const loopEnd = endFrame || frames.length - 2

  const [frameNumber, setFrameNumber] = useState(startFrame)

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
