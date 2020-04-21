import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SpeakerButton as BaseSpeakerButton } from '../../../packages/hem-buttons'
import { ITrack, playPlayer, mutePlayer, unmutePlayer, unpausePlayer } from '../index'

interface IProps {
  canStartPlayback?: boolean
  crossedState?: 'muted' | 'unmuted'
  track: ITrack
}

function MuteButton({ canStartPlayback, crossedState, track }: IProps): ReactElement {
  const { currentTrackId, muted, playing } = useSelector((state: any) => ({
    currentTrackId: state.player.currentTrackId,
    muted: state.player.muted,
    playing: state.player.playing,
  }))

  const dispatch = useDispatch()

  const speakerButtonOnClick = useCallback(
    function speakerButtonOnClickFn() {
      if (muted) {
        dispatch(unmutePlayer())

        if (canStartPlayback && !playing && currentTrackId) {
          console.log(1)
          dispatch(unpausePlayer())
        }

        else if (canStartPlayback && !playing && track) {
          dispatch(playPlayer(track))
        }
      }

      else {
        dispatch(mutePlayer())
      }
    }, [playing, muted],
  )

  return (
    <div className="hem-player-mute-button">
      <BaseSpeakerButton
        crossedState={crossedState}
        muted={muted}
        onClick={speakerButtonOnClick}
      />
    </div>
  )
}

export default MuteButton
