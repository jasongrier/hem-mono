import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayPauseButton as BasePlayPauseButton } from '../../../packages/hem-buttons'
import { ITrack, pausePlayer, cueTrack, unpausePlayer } from '../index'
import { Spinner } from '../../../components'

interface IProps {
  track: ITrack
}

function TrackPlayPauseButton({ track }: IProps): ReactElement {
  const { actuallyPlaying, currentTrackId, playerPlaying } = useSelector((state: any) => ({
    actuallyPlaying: state.player.actuallyPlaying,
    currentTrackId: state.player.currentTrack?.id,
    playerPlaying: state.player.playing,
  }))

  const dispatch = useDispatch()

  const playPauseButtonOnClick = useCallback(
    function playPauseButtonOnClickFn() {
      if (track.id !== currentTrackId) {
        dispatch(cueTrack(track, true))
      }

      else {
        if (playerPlaying) {
          dispatch(pausePlayer())
        }

        else {
          dispatch(unpausePlayer())
        }
      }
    }, [currentTrackId, playerPlaying, track.id],
  )

  const showSpinner = currentTrackId === track.id && playerPlaying && !actuallyPlaying

  return (
    <div className="hem-player-track-play-pause-button">
      { showSpinner && (
        <Spinner />
      )}
      { !showSpinner && (
        <BasePlayPauseButton
          playing={playerPlaying && (track.id === currentTrackId)}
          onClick={playPauseButtonOnClick}
        />
      )}
    </div>
  )
}

export default TrackPlayPauseButton
