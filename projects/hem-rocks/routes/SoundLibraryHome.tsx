import React, { ReactElement, useState } from 'react'
import { Helmet } from 'react-helmet'
import { PlayPauseButton, SpeakerButton } from '../../../lib/components'
import { Displace, Slider } from '../components/layout'
import { BASE_SITE_PAGE_TITLE } from '../config'

const dummySlides = [
  'Grand Piano',
  'Grand Piano – Extended',
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
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(true)

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
        <h2 className="pack-nav-header">FEB 2020 &mdash; New packs in the Sound Library:</h2>
        <ul>
          {dummySlides.map((title, index) => (
            <li
              className={slideIndex === index ? 'active' : ''}
              key={index}
              onClick={() => setSlideIndex(index)}
            >
              <span className="pack-nav-caret">{slideIndex === index ? '> ' : ''}</span>
              <span>{ title }</span>
              <div
                className="pack-nav-play"
                style={{
                  backgroundColor: slideColors[slideIndex],
                }}
              />
            </li>
          ))}
        </ul>
      </nav>

      { slideIndex > 0 &&
        <div
          className="pack-slider-arrow pack-slider-arrow-prev"
          onClick={() => setSlideIndex(slideIndex - 1)}
        >
          <div className="pack-slider-arrow-icon" />
        </div>
      }

      { slideIndex < dummySlides.length - 1 &&
        <div
          className="pack-slider-arrow pack-slider-arrow-next"
          onClick={() => setSlideIndex(slideIndex + 1)}
        >
          <div className="pack-slider-arrow-icon" />
        </div>
      }

      <div className="pack-slider">
        <Slider
          panelWidth={81}
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
              />
            </Displace>
          ))}
        </Slider>

        <div className="pack-info">
          <div className="pack-info-text">
            <h4>New Pack: { dummySlides[slideIndex] }</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.</p>
            <p>
              <button
                className="pack-info-cta"
                style={{
                  backgroundColor: slideColors[slideIndex],
                }}
              >
                Download
              </button>
            </p>
          </div>
          <div className="pack-player">
            <PlayPauseButton
              className="pack-info-play"
              playing={playing}
              setPlaying={setPlaying}
            />
            <SpeakerButton
              className="pack-info-volume"
              muted={muted}
              setMuted={setMuted}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoundLibraryHome
