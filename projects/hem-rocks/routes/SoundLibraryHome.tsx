import React, { ReactElement, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  NextButton,
  PlayPauseButton,
  SpeakerButton,
} from '../../../lib/components/buttons'
import { Slider } from '../../../lib/components'
import { WebsitePlayer } from '../../../lib/classes/audio'
import { HeroineCarousel } from '../components/layout'
import { BASE_SITE_PAGE_TITLE } from '../config'
import { RootState } from '../store'
import {
  carouselNext,
  carouselPrevious,
  carouselSetIndex,
  playerSetVolume,
  playerTogglePlaying,
} from '../store/actions'

const playerEngine = WebsitePlayer.getInstance()

function SoundLibraryHome(): ReactElement {
  const { carouselIndex, carouselItems, playerMuted, playerPlaying } = useSelector((state: RootState) => ({
    carouselIndex: state.app.carouselIndex,
    carouselItems: state.app.carouselItems,
    playerMuted: state.app.playerVolume === 0,
    playerPlaying: state.app.playerPlaying,
  }))

  const dispatch = useDispatch()

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

    dispatch(playerSetVolume(0))
  }, [])

  useEffect(() => {
    const wasPlaying = playerEngine.isPlaying()
    playerEngine.seek(0)
    setProgress(0)
    playerEngine.load(carouselItems[carouselIndex].soundUrl)
    wasPlaying && playerEngine.play()
  }, [carouselIndex])

  useEffect(() => {
    document.body.addEventListener('keypress', togglePlayingFromSpaceBar)
    return function cleanup() {
      document.body.removeEventListener('keypress', togglePlayingFromSpaceBar)
    }
  }, [])

  useEffect(() => {
    document.body.addEventListener('keydown', advanceCarouselFromArrowKeys)
    return function cleanup() {
      document.body.removeEventListener('keydown', advanceCarouselFromArrowKeys)
    }
  }, [])

  function advanceCarouselFromArrowKeys(evt: any) {
    if (evt.keyCode === 37) {
      dispatch(carouselPrevious())
    }

    else if (evt.keyCode === 39) {
      dispatch(carouselNext())
    }
  }

  useEffect(() => {
    if (playerPlaying) {
      playerEngine.play()
      dispatch(playerSetVolume(1))
    }

    else {
      playerEngine.pause()
    }
  }, [playerPlaying])

  useEffect(() => {
    playerEngine.setVolume(playerMuted ? 0 : 1)
  }, [playerMuted])

  function togglePlayingFromSpaceBar(evt: any) {
    if (evt.keyCode === 32) {
      dispatch(playerTogglePlaying())
    }
  }

  return (
    <div className="page sound-library-home">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Sound Library</title>
        <meta name="description" content="" />
      </Helmet>

      <div className="player-carousel">
        <HeroineCarousel index={carouselIndex}>
          {carouselItems.map((_, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(../../static/assets/images/carousel-test/carousel-test-${index}.jpg)`,
              }}
            />
          ))}
        </HeroineCarousel>
      </div>

      <div className="pack-info">
        <h4>New Pack: { carouselItems[carouselIndex].title }</h4>
        <p>
          { carouselItems[carouselIndex].description }
        </p>
        <p>
          <button className="pack-info-cta">
            Download Now
          </button>
        </p>
      </div>

      <div className="pack-player">
        <div className="pack-player-button-wrapper">
          <PlayPauseButton
            playing={playerPlaying}
            onClick={() => dispatch(playerTogglePlaying())}
          />
        </div>
        <div className="pack-player-button-wrapper">
          <SpeakerButton
            muted={playerMuted}
            // TODO: Should simply forward the onClick, not set the value
            setMuted={() => dispatch(playerSetVolume(playerMuted ? 0 : 1))}
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
        <div className="pack-player-button-wrapper">
          <NextButton onClick={() => {
              dispatch(carouselSetIndex(carouselIndex < carouselItems.length - 1 ? carouselIndex + 1 : 0))
          }} />
        </div>
      </div>
    </div>
  )
}

export default SoundLibraryHome
