import React, { ReactElement, useEffect, useCallback, useRef, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { coords } from '../../../functions'
import { seekPlayer } from '../index'

declare const window: any

interface IProps {
  id: string
}

function ProgressBar({ id }: IProps): ReactElement {
  const { actuallyPlaying } = useSelector((state: any) => ({
    actuallyPlaying: state.player.actuallyPlaying,
  }))

  const dispatch = useDispatch()

  const ref = useRef<null | HTMLDivElement>(null)

  useEffect(function init() {
    const progressBarEl = ref?.current

    if (!progressBarEl) return

    if (!actuallyPlaying) {
      setMeter(progressBarEl, false)
      return
    }

    const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

    if (!playerInstance) return

    playerInstance.on('time', function() {
      setMeter(progressBarEl, playerInstance)
    })
  }, [actuallyPlaying])

  const barOnClick = useCallback(
    function barOnClickFn(evt: SyntheticEvent<HTMLDivElement>) {
      if (!actuallyPlaying) return
      const progressBarEl = ref?.current
      if (!progressBarEl) return
      const { x } = coords(evt, progressBarEl)
      dispatch(seekPlayer(x))
    }, [actuallyPlaying],
  )

  function setMeter(progressBarEl: HTMLDivElement, playerInstance: any) {
    if (!progressBarEl) return

    const meter: HTMLDivElement | null = progressBarEl.querySelector('.hem-player-progress-bar-meter')

    if (!meter) return

    if (playerInstance === false) {
      meter.style.width = '0'
    }

    else {
      meter.style.width = (playerInstance.currentTime() / playerInstance.getDuration() * 100) + '%'
    }
  }

  return (
    <div
      className="hem-player-progress-bar"
      onClick={barOnClick}
      ref={ref}
    >
      <div
        className="hem-player-progress-bar-meter"
        id={id}
      />
    </div>
  )
}

export default ProgressBar
