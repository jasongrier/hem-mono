import React, { ReactElement, useState} from 'react'
import { IWebMovie } from '..'

interface IProps {
  movie: IWebMovie
}

function WebMovie({ movie }: IProps): ReactElement {
  const [currentClip, setCurrentClip] = useState<number>(0)
  const [currentFrame, setCurrentFrame] = useState<number>(0)

  if (!movie) return <div />

  return (
    <div className="hem-web-movie">
      <div className="hem-web-movie-screen">
        <div>{ movie.title }</div>
        <div>–{ movie.loaded.toString() }</div>
        <div>
          { movie.clips.map(clip => (
            <div>
              <div>——{ clip.loaded.toString() }</div>
              { clip.frames.map(frame => (
                <div>———{ frame.loaded.toString() }</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WebMovie
