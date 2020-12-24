import { map, flatten, filter } from 'lodash'
import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { Spinner } from '../../../components'
import { IWebMovie } from '../index'

interface IProps {
  movie: IWebMovie

  frameRate?: number
  startClip?: number
  canStart?: boolean
  onStart?: () => void
}

function WebMovie({ children, movie, frameRate = 6, onStart, startClip = 0, canStart = true }: PropsWithChildren<IProps>): ReactElement {
  const [percentLoaded, setPercentLoaded] = useState<number>(0)
  const [readyToStart, setReadyToStart] = useState<boolean>(false)
  const [startSent, setStartSent] = useState<boolean>(false)
  const [position, setPosition] = useState<{ clip: number, frame: number }>(
    { clip: startClip, frame: 0 },
  )

  useEffect(function() {
    const allFrames = flatten(map(movie.clips, 'frames'))
    const loadedFrames = filter(allFrames, 'loaded')
    const percentLoaded = Math.floor(loadedFrames.length / allFrames.length * 100)

    setPercentLoaded(percentLoaded)

    if (percentLoaded === 100) {
      setReadyToStart(true)
    }
  }, [movie])

  useEffect(function() {
    if (!readyToStart) return
    if (!canStart) return

    if (!startSent && onStart) {
      onStart()
      setStartSent(true)
    }

    let { clip, frame } = position

    const tick = setTimeout(function clock() {
      if (frame < movie.clips[clip].frames.length - 1) {
        frame = frame + 1
      }

      else {
        if (clip < movie.clips.length - 1) {
          clip = clip + 1
        }

        else {
          clip = 0
        }

        frame = 0
      }

      setPosition({ clip, frame })
    }, 1000 / frameRate)

    return function cleanup() {
      clearTimeout(tick)
    }
  }, [readyToStart, canStart, startSent, position])

  // if (!movie || !readyToStart) return (
  //   <div className="hem-web-movie hem-web-movie-splash">
  //     { children }
  //   </div>
  // )

  return (
    <div className={`
      hem-web-movie
      ${ readyToStart ? 'hem-web-movie-ready' : '' }
    `}>
      <div
        className="hem-web-movie-splash"
        style={{ opacity: readyToStart ? 0 : 1 }}
      >
        <p>
          <span className="title" style={{ fontSize: '100px' }}>Life in Letters:<br />A "fan vid"</span><br />
          { percentLoaded }%
        </p>
      </div>
      <div className="hem-web-movie-screen">
        { movie.clips.map(clip => (
          <div
            className="hem-web-movie-clip"
            key={clip.id}
          >
            { clip.frames.map((frame, i) => (
              <div
                className={`
                  hem-web-movie-frame
                  ${ position.frame === i ? 'hem-web-movie-current-frame' : ''}
                `}
                key={frame.id}
                style={{
                  backgroundImage: `url(${frame.src})`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WebMovie
