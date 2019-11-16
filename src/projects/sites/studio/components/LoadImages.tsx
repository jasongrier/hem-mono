import React, { ReactElement, useEffect, useState } from 'react'
import $ from 'jquery'

interface IProps {
  images: string[]
  onImageLoaded?: (imageNumber: number) => void
  onImagesLoaded: () => void
}

function LoadImages({ images, onImageLoaded, onImagesLoaded }: IProps): ReactElement {
  useEffect(() => {
    let imagesLoaded = 0

    for (const src of images) {
      $('<img>')
        .on('load', () => {
          if (imagesLoaded === images.length - 1) {
            onImagesLoaded()
          }

          else {
            onImageLoaded && onImageLoaded(imagesLoaded)
            imagesLoaded = imagesLoaded + 1
          }
        })
        .attr('src', src)
    }
  }, [])

  return (
    <div className="load-images">

    </div>
  )
}

export default LoadImages
