import React, { ReactElement, useCallback, PropsWithChildren, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayPauseButton as BasePlayPauseButton } from '../../../packages/hem-buttons'
import { ITrack, pausePlayer, playTrack, unpausePlayer } from '../index'
import { Spinner } from '../../../components'

interface IProps {
  track: ITrack

  activeFor?: ITrack[]
  className?: string
  onClick?: (playing: boolean) => void
}

function TrackPlayPauseButton({ track, activeFor = [], onClick, className }: PropsWithChildren<IProps>): ReactElement {
  const { actuallyPlaying, currentTrackId, playerPlaying } = useSelector((state: any) => ({
    actuallyPlaying: state.player.actuallyPlaying,
    currentTrackId: state.player.currentTrack?.id,
    playerPlaying: state.player.playing,
  }))

  const dispatch = useDispatch()

  const playPauseButtonOnClick = useCallback(
    function playPauseButtonOnClickFn(evt) {
      evt.stopPropagation()

      onClick && onClick(playerPlaying)

      if (track.id !== currentTrackId) {
        dispatch(playTrack(track))
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

  const activeForIds = activeFor.map(track => track.id)
  let playing = false

  if (
    playerPlaying
    && (
      (track.id === currentTrackId)
      || activeForIds.includes(currentTrackId)
    )
  ) {
    playing = true
  }

  return (
    <div className={`
      hem-player-track-play-pause-button
      ${ className ? className : ''}
    `}>
      { showSpinner && (
        <Spinner />
      )}
      { !showSpinner && (
        <BasePlayPauseButton
          onClick={playPauseButtonOnClick}
          playing={playing}
          useFa={false}
        />
      )}
    </div>
  )
}

export default TrackPlayPauseButton
