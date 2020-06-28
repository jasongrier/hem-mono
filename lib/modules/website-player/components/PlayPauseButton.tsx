import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayPauseButton as BasePlayPauseButton } from '../../../packages/hem-buttons'
import { pausePlayer, unpausePlayer } from '../index'
import { Spinner } from '../../../components'

interface IProps {
  onClick?: (wasPlaying: boolean) => void
}

function PlayPauseButton({ onClick }: IProps): ReactElement {
  const { actuallyPlaying, playerPlaying } = useSelector((state: any) => ({
    actuallyPlaying: state.player.actuallyPlaying,
    playerPlaying: state.player.playing,
  }))

  const dispatch = useDispatch()

  const playPauseButtonOnClick = useCallback(
    function playPauseButtonOnClickFn() {
      onClick && onClick(playerPlaying)

      if (playerPlaying) {
        dispatch(pausePlayer())
      }

      else {
        dispatch(unpausePlayer())
      }
    }, [playerPlaying],
  )

  const spinnerOnClick = useCallback(
    function spinnerOnClickFn() {
      dispatch(pausePlayer())
    }, [playerPlaying],
  )

  const showSpinner = playerPlaying && !actuallyPlaying

  return (
    <div className="hem-player-play-pause-button">
      { showSpinner && (
        <div
          className="hem-player-play-pause-button-spinner"
          onClick={spinnerOnClick}
        >
          <Spinner />
        </div>
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
