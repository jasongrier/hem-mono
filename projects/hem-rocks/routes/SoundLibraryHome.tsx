import React, { ReactElement, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Displace, Slider } from '../components/layout'
import { BASE_SITE_PAGE_TITLE } from '../config'

const dummySlides = [
  'Grand Piano',
  'Grand Piano: Extended',
  'Viola',
  'Noise Reduction Artefacts',
  'Seurat for Push',
]

const slideColors = [
  '#000000',
  '#103740',
  '#271040',
  '#104014',
  '#591107',
]

function SoundLibraryHome(): ReactElement {
  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <div className="page sound-library-home">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Sound Library</title>
        <meta name="description" content="" />
      </Helmet>

      <nav
        className="pack-nav"
        style={{
          backgroundColor: slideColors[slideIndex],
        }}
      >
        <h2 className="pack-nav-header">Sound Library, Second Edition</h2>
        <ul>
          {dummySlides.map((title, index) => (
            <li
              className={slideIndex === index ? 'active' : ''}
              key={index}
              onClick={() => setSlideIndex(index)}
            >
              <span className="pack-nav-caret">{slideIndex === index ? '> ' : ''}</span>
              <span>{ title }</span>
              {/* <div
                className="pack-nav-play"
                style={{
                  backgroundColor: slideColors[slideIndex],
                }}
              /> */}
            </li>
          ))}
        </ul>
      </nav>

      <div className="pack-slider">
        <Slider
          panelWidth={80}
          slideIndex={slideIndex}
          unit="vw"
        >
          {['-'].concat(dummySlides).concat('-').map((name, index) => (
            <Displace
              compensate={['skewX']}
              key={index}
              random={true}
              skewX={1}
              translateY={15}
              unipolar={['skewX']}
            >
              <div
                className="pack-slider-panel"
                style={{ backgroundImage: `url(../../static/assets/images/carousel-test/carousel-test-${index}.jpg)` }}
              >
                { index > 0 && index < dummySlides.length && (
                  <div className="pack-slider-panel-content">
                    <div className="panel-button panel-play" />
                    <div className="panel-button panel-volume" />
                  </div>
                )}
              </div>
            </Displace>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default SoundLibraryHome
