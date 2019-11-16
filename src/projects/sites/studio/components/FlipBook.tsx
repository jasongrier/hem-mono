import React, { ReactElement, useEffect, useState } from 'react'

type flickerFunction = (frameNumber: number) => boolean

interface IProps {
  frames: string[] // TODO: All projects, separate alphabetized required props from optionals

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
  const loopEnd = endFrame || frames.length - 1

  const [frameNumber, setFrameNumber] = useState(startFrame)

  useEffect(() => {
    if (!playing) return
    if (!loop && frameNumber >= loopEnd) return

    const projectorInterval = setTimeout(() => {
      setFrameNumber(frameNumber > loopEnd ? startFrame : frameNumber + 1)
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
