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
  playerSetVolume,
  playerToggleMuted,
  playerTogglePlaying,
} from '../store/actions'

const playerEngine = WebsitePlayer.getInstance()

function SoundLibraryHome(): ReactElement {
  const { carouselIndex, carouselItems, currentCarouselItem, playerMuted, playerPlaying } = useSelector((state: RootState) => ({
    carouselIndex: state.app.carouselIndex,
    carouselItems: state.app.carouselItems,
    currentCarouselItem: state.app.carouselItems[state.app.carouselIndex],
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
              className="player-carousel-panel"
              key={index}
              style={{
                backgroundImage: `url(../../static/assets/images/carousel-test/carousel-test-${index}.jpg)`,
              }}
            />
          ))}
        </HeroineCarousel>
      </div>

      <div className="pack-info">
        <h4>{ currentCarouselItem.title }</h4>
        <p>
          { currentCarouselItem.description }
        </p>
        <p>
          <button
            className="pack-info-cta"
            onClick={() => {
              if (carouselIndex === 0) {
                dispatch(carouselNext())
              }

              else {
                // dispatch(openPopup('download-sample', currentCarouselItem.packId))
              }
            }}
          >
            { currentCarouselItem.buttonText }
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
            setMuted={() => dispatch(playerToggleMuted())}
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
        <div className="pack-player-button-wrapper prev-button">
          <NextButton onClick={() => {
              dispatch(carouselPrevious())
          }} />
        </div>
        <div className="pack-player-button-wrapper">
          <NextButton onClick={() => {
              dispatch(carouselNext())
          }} />
        </div>
      </div>
    </div>
  )
}

export default SoundLibraryHome
