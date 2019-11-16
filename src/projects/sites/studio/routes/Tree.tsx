import React, { ReactElement, useState } from 'react'
import FlipBook from '../components/FlipBook'
import LoadImages from '../components/LoadImages' // TODO: Barrel file (all projects)
import { generateImageSequenceUrls } from '../functions'

const frames = generateImageSequenceUrls({
  base: 'http://hem.rocks/studio-assets/films/frames/tree/IMG_',
  end: 3255,
  ext: 'jpeg',
  start: 3130,
})

function Tree(): ReactElement {
  const [ready, setReady] = useState(false)

  return (
    <div className="page page--tree">
      <LoadImages
        images={frames}
        onImagesLoaded={() => setReady(true)}
      />
      {ready ?
        <div className="tree-movie">
          <FlipBook frames={frames} />
        </div>
        :
        <div>loading...</div>
      }
    </div>
  )
}

export default Tree
