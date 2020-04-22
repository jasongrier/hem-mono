import React, { ReactElement, useEffect, useCallback, useRef, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { coords } from '../../../functions'
import { seekPlayer } from '../index'

declare const window: any

interface IProps {
  id: string
}

function ProgressBar({ id }: IProps): ReactElement {
  const { actuallyPlaying, playerPlaying } = useSelector((state: any) => ({
    actuallyPlaying: state.player.actuallyPlaying,
    playerPlaying: state.player.playing,
  }))

  const dispatch = useDispatch()

  const ref = useRef<null | HTMLDivElement>(null)

  useEffect(function init() {
    const progressBarBarEl = getProgressBarBarEl()

    if (!progressBarBarEl) return
    if (!playerPlaying) return
    if (!actuallyPlaying) return

    const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

    if (!playerInstance) return

    playerInstance.on('time', function() {
      progressBarBarEl.style.width = (playerInstance.currentTime() / playerInstance.getDuration() * 100) + '%'
    })
  }, [actuallyPlaying])

  const barBarOnClick = useCallback(
    function barBarOnClickFn(evt: SyntheticEvent<HTMLDivElement>) {
      const progressBarBarEl = getProgressBarBarEl()
      if (!progressBarBarEl) return
      const { x } = coords(evt, progressBarBarEl)
      dispatch(seekPlayer(x))
    }, [],
  )

  function getProgressBarBarEl() {
    if (!ref || !ref.current) return
    return ref.current
  }

  return (
    <div className="hem-player-progress-bar">
      <div
        className="hem-player-progress-bar-bar"
        id={id}
        ref={ref}
        onClick={barBarOnClick}
      />
    </div>
  )
}

export default ProgressBar
