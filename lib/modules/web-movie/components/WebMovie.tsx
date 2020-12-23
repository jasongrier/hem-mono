import { map, flatten } from 'lodash'
import React, { ReactElement, useEffect, useState } from 'react'
import { Spinner } from '../../../components'
import { IWebMovie } from '../index'

interface IProps {
  movie: IWebMovie
}

function WebMovie({ movie }: IProps): ReactElement {
  const [readyToStart, setReadyToStart] = useState<boolean>(false)
  const [position, setPosition] = useState<{ clip: number, frame: number }>({ clip: 0, frame: 0 })

  useEffect(function() {
    setReadyToStart(
      !flatten(
        movie.clips.map(({ frames }) => map(frames, 'loaded'))
      )
        .slice(0, 100)
        .includes(false)
    )
  }, [movie])

  useEffect(function() {
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
    }, 200)

    return function cleanup() {
      clearTimeout(tick)
    }
  }, [position])

  if (!movie || !readyToStart) return (
    <Spinner />
  )

  return (
    <div className="hem-web-movie">
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
