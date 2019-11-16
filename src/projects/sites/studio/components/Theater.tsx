import React, { ReactElement, useState } from 'react'
import FlipBook from '../components/FlipBook'
import LoadImages from '../components/LoadImages' // TODO: Barrel file (all projects)
import { generateImageSequenceUrls } from '../functions'

export interface IFrameSet {
  name: string
  sequenceEndNumber: number
  sequenceStartNumber: number
}

interface IProps {
  frameSets: IFrameSet[]
}

function Theater({ frameSets: rawFrameSets }: IProps): ReactElement {
  const [ready, setReady] = useState(false)

  const frameSets = rawFrameSets.map(({name, sequenceEndNumber, sequenceStartNumber}) => ({
    name,
    frames: generateImageSequenceUrls({
      base: `http://hem.rocks/studio-assets/films/frames/${name}/IMG_`,
      end: sequenceEndNumber,
      ext: 'jpeg',
      start: sequenceStartNumber,
    }),
  }))

  return (
    <div className="theater">
      {frameSets.map(({ name, frames }) => (
        <div
          className={`theater__projector theater__projector--${name}`}
          key={name}
        >
          <LoadImages
            images={frames}
            onImagesLoaded={() => setReady(true)}
          />
          {ready ?
            <div className="theater__flip-book">
              <FlipBook frames={frames} />
            </div>
            :
            <div>loading...</div>
          }
        </div>
      ))}
    </div>
  )
}

export default Theater
