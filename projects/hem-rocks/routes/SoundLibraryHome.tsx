import React, { ReactElement, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { PlayPauseButton, Slider, SpeakerButton } from '../../../lib/components'
import { Displace, Carousel } from '../components/layout'
import { BASE_SITE_PAGE_TITLE } from '../config'
import { RootState } from '../store'
import { playerPlay, playerPause, playerSetVolume } from '../store/actions'

function setPlayerPosition(foo: number) {

}

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
  const { playerMuted, playerPlaying } = useSelector((state: RootState) => ({
    playerMuted: state.app.playerVolume === 0,
    playerPlaying: state.app.playerPlaying,
  }))

  const dispatch = useDispatch()

  const [slideIndex, setSlideIndex] = useState(0)
  const [sliderValue, setSliderValue] = useState(0)

  function setMuted() {
    dispatch(playerMuted ? playerSetVolume(1) : playerSetVolume(0))
  }

  function setPlaying() {
    dispatch(playerPlaying ? playerPause() : playerPlay())
  }

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
            </li>
          ))}
        </ul>
      </nav>

      { slideIndex > 0 &&
        <div
          className="pack-carousel-arrow pack-carousel-arrow-prev"
          onClick={() => setSlideIndex(slideIndex - 1)}
        >
          <div className="pack-carousel-arrow-icon" />
        </div>
      }

      { slideIndex < dummySlides.length - 1 &&
        <div
          className="pack-carousel-arrow pack-carousel-arrow-next"
          onClick={() => setSlideIndex(slideIndex + 1)}
        >
          <div className="pack-carousel-arrow-icon" />
        </div>
      }

      <div className="pack-carousel">
        <Carousel
          panelWidth={81}
          slideIndex={slideIndex}
          unit="vw"
        >
          {['-'].concat(dummySlides).concat('-').map((name, index) => (
            <Displace
              compensate={['skewX']}
              key={index}
              random={true}
              skewX={1.2}
              translateY={15}
              unipolar={['skewX']}
            >
              <div
                className="pack-carousel-panel"
                style={{ backgroundImage: `url(../../static/assets/images/carousel-test/carousel-test-${index}.jpg)` }}
              />
            </Displace>
          ))}
        </Carousel>

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
                Download Now
              </button>
            </p>
          </div>
          <div className={`pack-player pack-player-${slideColors[slideIndex].replace('#', '')}`}>
            <PlayPauseButton
              className="pack-info-play"
              playing={playerPlaying}
              setPlaying={setPlaying}
            />
            <SpeakerButton
              className="pack-info-volume"
              muted={playerMuted}
              setMuted={setMuted}
            />
            <Slider
              value={sliderValue}
              onChange={setSliderValue}
              onChangeDone={() => { dispatch(setPlayerPosition(sliderValue)) }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoundLibraryHome
