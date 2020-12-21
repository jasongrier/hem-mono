import React, { ReactElement, useEffect, useCallback, useRef, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { coords } from '../../../functions'
import { seekPlayer } from '../index'
import { getPlayerInstance, formatTime } from '../functions'

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

    const playerInstance = getPlayerInstance()

    if (!playerInstance) return

    playerInstance.addEventListener('timeupdate', function() {
      setMeter(progressBarEl, playerInstance)
    })

    playerInstance.addEventListener('timeupdate', function() {
      setTime(progressBarEl, playerInstance)
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
      meter.style.width = (playerInstance.currentTime / playerInstance.duration * 100) + '%'
    }
  }

  function setTime(progressBarEl: HTMLDivElement, playerInstance: any) {
    if (!progressBarEl) return

    const startTimeEl: HTMLDivElement | null = progressBarEl.querySelector('.hem-player-progress-bar-meter-start-time')
    const endTimeEl: HTMLDivElement | null = progressBarEl.querySelector('.hem-player-progress-bar-meter-end-time')

    if (!startTimeEl) return
    if (!endTimeEl) return

    if (playerInstance === false) {
      startTimeEl.innerHTML = ''
      endTimeEl.innerHTML = ''
    }

    else {
      startTimeEl.innerHTML = formatTime(playerInstance.currentTime)
      endTimeEl.innerHTML = '-' + formatTime(playerInstance.duration - playerInstance.currentTime)
    }
  }

  return (
    <div
      className="hem-player-progress-bar"
      onClick={barOnClick}
      ref={ref}
    >
      <div className="hem-player-progress-bar-meter-start-time" />
      <div
        className="hem-player-progress-bar-meter"
        id={id}
      />
      <div className="hem-player-progress-bar-meter-end-time" />
    </div>
  )
}

export default ProgressBar
