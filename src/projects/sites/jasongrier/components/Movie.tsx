import React, { ReactElement, useEffect, useState } from 'react'

type flickerFunction = (frameNumber: number) => boolean

interface IProps {
  endFrame?: number
  flickerThreshold?: flickerFunction | number
  flickerMin?: number
  flickerMax?: number
  frameRate?: number
  frameUrl: string
  loop?: boolean
  frameType?: 'jpg' | 'svg'
  playing?: boolean
  startFrame?: number
  styleFunction?: (frameNumber: number) => any
  totalFrames: number
}

function frameStack(count: number) {
  return new Array(count).fill(null)
}

function Movie({
  endFrame,
  flickerThreshold = 1,
  flickerMin = 0,
  flickerMax = 1,
  frameRate = 6, // TODO: Make this truly fps not some weird fudge factor
  frameUrl,
  loop = true,
  frameType = 'jpg',
  playing = true,
  startFrame = 0,
  styleFunction = () => {},
  totalFrames,
}: IProps): ReactElement {
  endFrame = endFrame || totalFrames

  const [frameNumber, setFrameNumber] = useState(0)

  useEffect(() => {
    const projectorInterval = setTimeout(() => {
      setFrameNumber(frameNumber > endFrame ? startFrame : frameNumber + 1)
    }, frameRate * 12)

    return function destroy() {
      clearTimeout(projectorInterval)
    }
  }, [frameNumber])

  const opacity = typeof flickerThreshold === 'number' ?
    Math.random() < flickerThreshold ? flickerMax : flickerMin
    : flickerThreshold(frameNumber)

  return (
    <div
      className="movie"
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

export default Movie
