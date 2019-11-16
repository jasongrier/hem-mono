import React, { ReactElement } from 'react'
// import FlipBook from '../components/FlipBook'
import LoadImages from '../components/LoadImages' // TODO: Barrel file (all projects)
import { generateImageSequenceUrls } from '../functions'

function Tree(): ReactElement {
  return (
    <div className="page page--tree">
      <LoadImages
        images={generateImageSequenceUrls({
          base: 'http://hem.rocks/studio-assets/films/frames/tree/IMG_',
          end: 3255,
          ext: 'jpeg',
          start: 3130,
        })}
        onImageLoaded={(imageNumber) => console.log('loaded: ', imageNumber)}
        onImagesLoaded={() => console.log('done')}
      />
      {/* <FlipBook /> */}
    </div>
  )
}

export default Tree
