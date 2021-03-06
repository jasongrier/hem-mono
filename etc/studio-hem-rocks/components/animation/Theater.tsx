import React, { ReactElement, useState } from 'react'
// TODO: Barrel file (all projects)
import FlipBook, { directionType } from './FlipBook'
// TODO: Move to common
import LoadImages from '../utility/LoadImages'
import { formatMovieSpecs } from '../../functions'

export interface IMovieSpec {
  frameSrc: {
    ext: string
    name: string
    sequenceEndNumber: number
    sequenceStartNumber: number

    diff?: number[]
  }
  movieProps?: {
    direction?: directionType
    flickerThreshold?: number
    frameRate?: number
  }
}

interface IProps {
  movieSpecs: IMovieSpec[]
  name: string
}

function Theater({ movieSpecs: rawMovieSpecs, name }: IProps): ReactElement {
  const [ready, setReady] = useState(false)

  const frameSets = formatMovieSpecs(rawMovieSpecs)

  return (
    <div className={`theater theater--${name}`}>
      <div className={`theater__projector-set`}>
        {frameSets.map(({ diff, frames, movieProps, name }, i) => (
          <div
            className={`theater__projector theater__projector--${name} theater__projector--${i}`}
            key={name + i}
          >
            <LoadImages
              images={frames}
              onImagesLoaded={() => setReady(true)}
            />
            {ready ?
              <FlipBook
                diff={diff}
                frames={frames}
                {...movieProps}
              />
              :
              <div className="theater__loading">
                <div>loading...</div>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Theater
