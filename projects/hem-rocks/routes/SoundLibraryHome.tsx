import React, { ReactElement, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Carousel } from '../components/layout'
import { BASE_SITE_PAGE_TITLE } from '../config'

function SoundLibraryHome(): ReactElement {
  const [carouselFrame, setCarouselFrame] = useState()

  return (
    <div className="page sound-library-home">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Sound Library</title>
        <meta name="description" content="" />
      </Helmet>
      {/* <nav className="carousel-nav">
        <ul>
          <li onClick={() => setCarouselFrame(1)}>Grand Piano</li>
          <li onClick={() => setCarouselFrame(2)}>Viola</li>
          <li onClick={() => setCarouselFrame(3)}>Noise Reduction Artefacts</li>
          <li onClick={() => setCarouselFrame(4)}>Seurat for Push</li>
        </ul>
      </nav> */}
      <div className="pack-carousel">
        <Carousel arrows={true}>
          <img src="https://via.placeholder.com/1024x768" />
          <img src="https://via.placeholder.com/1024x768" />
          <img src="https://via.placeholder.com/1024x768" />
          <img src="https://via.placeholder.com/1024x768" />
          <img src="https://via.placeholder.com/1024x768" />
        </Carousel>
      </div>
    </div>
  )
}

export default SoundLibraryHome
