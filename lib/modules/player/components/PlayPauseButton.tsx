import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayPauseButton as BasePlayPauseButton } from '../../../packages/hem-buttons'
import { pausePlayer, unpausePlayer } from '../index'
import { Spinner } from '../../../components'

function PlayPauseButton(): ReactElement {
  const { actuallyPlaying, playerPlaying } = useSelector((state: any) => ({
    actuallyPlaying: state.player.actuallyPlaying,
    playerPlaying: state.player.playing,
  }))

  const dispatch = useDispatch()

  const playPauseButtonOnClick = useCallback(
    function playPauseButtonOnClickFn() {
      if (playerPlaying) {
        dispatch(pausePlayer())
      }

      else {
        dispatch(unpausePlayer())
      }
    }, [playerPlaying],
  )

  const showSpinner = playerPlaying && !actuallyPlaying

  return (
    <div className="hem-player-play-pause-button">
      { showSpinner && (
        <Spinner />
      )}
      { !showSpinner && (
        <BasePlayPauseButton
          playing={playerPlaying}
          onClick={playPauseButtonOnClick}
        />
      )}
    </div>
  )
}

export default PlayPauseButton
