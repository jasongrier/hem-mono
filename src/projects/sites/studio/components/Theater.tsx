import React, { ReactElement, useState } from 'react'
import { generateImageSequenceUrls } from '../functions'
import FlipBook from '../components/FlipBook'
import LoadImages from '../components/LoadImages' // TODO: Barrel file (all projects)

export interface IMovieSpec {
  ext: string
  name: string
  flickerThreshold?: number
  frameRate?: number
  sequenceEndNumber: number
  sequenceStartNumber: number
}

interface IProps {
  frameSets: IMovieSpec[]
  name: string
}

function Theater({ frameSets: rawFrameSets, name }: IProps): ReactElement {
  const [ready, setReady] = useState(false)

  const frameSets = rawFrameSets.map(({ ext, flickerThreshold, frameRate, name, sequenceEndNumber, sequenceStartNumber }) => ({
    name,
    flickerThreshold,
    frameRate,
    frames: generateImageSequenceUrls(
      `http://hem.rocks/studio-assets/films/frames/${name}/IMG_`,
      sequenceEndNumber,
      ext,
      sequenceStartNumber,
    ),
  }))

  return (
    <div className={`theater theater--${name}`}>
      <div className={`theater__projector-set`}>
        {frameSets.map(({ name, flickerThreshold, frameRate, frames }) => (
          <div
            className={`theater__projector theater__projector--${name}`}
            key={name}
          >
            <LoadImages
              images={frames}
              onImagesLoaded={() => setReady(true)}
            />
            {ready ?
              <FlipBook
                flickerThreshold={flickerThreshold}
                frameRate={frameRate}
                frames={frames}
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
