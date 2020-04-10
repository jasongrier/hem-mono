import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SpeakerButton } from '../../../packages/hem-buttons'
import { mute, unmute } from '../index'

interface IProps {

}

function MuteButton({ }: IProps): ReactElement {
  const { muted } = useSelector((state: any) => ({
    muted: state.player.muted,
  }))

  const dispatch = useDispatch()

  const onSetMuted = useCallback(
    function onSetMutedFn(val: boolean) {
      if (val) {
        dispatch(mute())
      }

      else {
        dispatch(unmute())
      }
    }, [muted],
  )

  return (
    <div className="hem-player-mute-button">
      <SpeakerButton
        muted={muted}
        onSetMuted={onSetMuted}
      />
    </div>
  )
}

export default MuteButton
