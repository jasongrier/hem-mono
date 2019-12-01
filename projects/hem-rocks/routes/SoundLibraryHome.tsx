import React, { ReactElement, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { PlayPauseButton, FastForwardButton } from '../../../lib/components/buttons'
import { Slider } from '../../../lib/components'
import { WebsitePlayer } from '../../../lib/classes/audio'
import { Displace, Carousel } from '../components/layout'
import { BASE_SITE_PAGE_TITLE } from '../config'
import { RootState } from '../store'
import { playerPlay, playerPause, playerSetVolume } from '../store/actions'

const playerEngine = WebsitePlayer.getInstance()
const carouselItems = [
  {
    title: 'Grand Piano',
    color: '#000000',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
    heightDisplacement: Math.random() * 100,
  }, {
    title: 'Grand Piano – Extended',
    color: '#103740',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
    heightDisplacement: Math.random() * 100,
  }, {
    title: 'Viola',
    color: '#271040',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
    heightDisplacement: Math.random() * 100,
  }, {
    title: 'Noise Reduction Artefacts',
    color: '#104014',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
    heightDisplacement: Math.random() * 100,
  }, {
    title: 'Seurat for Push',
    color: '#591107',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
    heightDisplacement: Math.random() * 100,
  }
]

function SoundLibraryHome(): ReactElement {
  const { playerMuted, playerPlaying } = useSelector((state: RootState) => ({
    playerMuted: state.app.playerVolume === 0,
    playerPlaying: state.app.playerPlaying,
  }))

  const dispatch = useDispatch()

  const [carouselIndex, setCarouselIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const subscriber = {
      id: 'new-packs-carousel',
      onProgress: (progress: number) => {
        setProgress(progress)
      }
    }

    playerEngine.subscribe(subscriber)
    playerEngine.load(carouselItems[0].soundUrl)

    setMuted(true)
    setPlaying(false)
  }, [])

  useEffect(() => {
    const wasPlaying = playerEngine.isPlaying()
    playerEngine.seek(0)
    setProgress(0)
    playerEngine.load(carouselItems[carouselIndex].soundUrl)
    wasPlaying && playerEngine.play()
  }, [carouselIndex])

  function toggleMuted() {
    setMuted(!playerMuted)
  }

  function togglePlaying() {
    setPlaying(!playerPlaying)
  }

  function setMuted(muted: boolean) {
    const newVolume = muted ? 0 : 1
    playerEngine.setVolume(newVolume)
    dispatch(playerSetVolume(newVolume))
  }

  function setPlaying(playing: boolean) {
    let action

    if (playing) {
      action = playerPlay()
      playerEngine.play()
      setMuted(false)
    }

    else {
      action = playerPause()
      playerEngine.pause()
    }

    dispatch(action)
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
          backgroundColor: carouselItems[carouselIndex].color,
        }}
      >
        <h2 className="pack-nav-header">FEB 2020 &mdash; New packs in the Sound Library:</h2>
        <ul>
          {carouselItems.map(({ title }, index) => (
            <li
              className={carouselIndex === index ? 'active' : ''}
              key={index}
              onClick={() => setCarouselIndex(index)}
            >
              <span className="pack-nav-caret">{carouselIndex === index ? '> ' : ''}</span>
              <span>{ title }</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="pack-carousel">
        <Carousel
          panelWidth={81}
          index={carouselIndex}
          unit="vw"
        >
          {[{} as any].concat(carouselItems).concat({} as any).map(({ heightDisplacement }, index) => (
            <Displace
              compensate={['skewX']}
              key={index}
              random={true}
              skewX={1.2}
              unipolar={['skewX']}
            >
              <div
                className="pack-carousel-panel"
                style={{
                  backgroundImage: `url(../../static/assets/images/carousel-test/carousel-test-${index}.jpg)`,
                  borderBottom: `${heightDisplacement}px solid #111`,
                }}
              />
            </Displace>
          ))}
        </Carousel>

        <div className="pack-info">
          <div className="pack-info-text">
            <h4>New Pack: { carouselItems[carouselIndex].title }</h4>
            <p>
              { carouselItems[carouselIndex].description }
              &nbsp;&nbsp;<Link to="/">&rarr;</Link>
            </p>
            <p>
              <button
                className="pack-info-cta"
                style={{
                  backgroundColor: carouselItems[carouselIndex].color,
                }}
              >
                Download Now
              </button>
            </p>
          </div>
          <div className={`pack-player pack-player-${carouselItems[carouselIndex].color.replace('#', '')}`}>
            <div className="pack-player-button-wrapper">
              <PlayPauseButton
                className="pack-info-play"
                playing={playerPlaying}
                setPlaying={togglePlaying}
              />
            </div>
            <div className="pack-player-button-wrapper">
              <FastForwardButton
                className="pack-info-fast-forward"
                onClick={() => {
                  setCarouselIndex(carouselIndex < 4 ? carouselIndex + 1 : 0)
                }}
              />
            </div>
            <Slider
              id="new-packs-progress-slider"
              onChange={value => {
                playerEngine.seek(value)
                setProgress(value)
              }}
              value={progress}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoundLibraryHome
