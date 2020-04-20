import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayPauseButton as BasePlayPauseButton } from '../../../packages/hem-buttons'
import { ITrack, pausePlayer, playPlayer, unpausePlayer } from '../index'

interface IProps {
  track: ITrack
}

function TrackPlayPauseButton({ track }: IProps): ReactElement {
  const { currentTrackId, playerPlaying } = useSelector((state: any) => ({
    currentTrackId: state.player.currentTrackId,
    playerPlaying: state.player.playing,
  }))

  const dispatch = useDispatch()

  const playPauseButtonOnClick = useCallback(
    function playPauseButtonOnClick() {
      if (track.id !== currentTrackId) {
        dispatch(playPlayer(track))
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

  return (
    <div className="hem-player-track-play-pause-button">
      <BasePlayPauseButton
        playing={playerPlaying && (track.id === currentTrackId)}
        onClick={playPauseButtonOnClick}
      />
    </div>
  )
}

export default TrackPlayPauseButton
