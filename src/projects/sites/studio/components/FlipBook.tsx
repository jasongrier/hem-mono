import React, { ReactElement, useEffect, useState } from 'react'

type flickerFunction = (frameNumber: number) => boolean

interface IProps {
  endFrame?: number
  flickerMax?: number
  flickerMin?: number
  flickerThreshold?: flickerFunction | number
  frameRate?: number
  frameType?: 'jpg' | 'svg'
  frameUrl: string
  loop?: boolean
  playing?: boolean
  startFrame?: number
  styleFunction?: (frameNumber: number) => any
  totalFrames: number
}

function frameStack(count: number) {
  return new Array(count).fill(null)
}

function FlipBook({
  endFrame,
  flickerMax = 1,
  flickerMin = 0,
  flickerThreshold = 1,
  frameRate = 6, // TODO: Make this truly fps not some weird fudge factor
  frameType = 'jpg',
  frameUrl,
  loop = true,
  playing = true,
  startFrame = 0,
  styleFunction = () => {},
  totalFrames,
}: IProps): ReactElement {
  const loopEnd = endFrame || totalFrames

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
    Math.random() < flickerThreshold ? flickerMax : flickerMin
    : flickerThreshold(frameNumber)

  return (
    <div
      className="flipbook"
      style={{
        position: 'relative',
      }}
    >
      {frameStack(129).map((_, i) => (
        <img
          key={i}
          src={`${frameUrl}/${i}.${frameType}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity,
            ...styleFunction(frameNumber)
          }}
        />
      ))}
    </div>
  )
}

export default FlipBook
