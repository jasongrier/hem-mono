import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayPauseButton as BasePlayPauseButton } from '../../../packages/hem-buttons'
import { pausePlayer, unpausePlayer } from '../index'

function PlayPauseButton(): ReactElement {
  const { playerPlaying } = useSelector((state: any) => ({
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

  return (
    <div className="hem-player-play-pause-button">
      <BasePlayPauseButton
        playing={playerPlaying}
        onClick={playPauseButtonOnClick}
      />
    </div>
  )
}

export default PlayPauseButton
