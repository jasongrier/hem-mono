import { call, put, select, takeLatest } from 'redux-saga/effects'
import ReactGA from 'react-ga'
import {
  NEXT_TRACK,
  PAUSE_PLAYER,
  PLAY_TRACK,
  PREVIOUS_TRACK,
  SEEK_PLAYER,
  SET_PLAYER_INSTANCE,
  TRACK_ENDED,
  UNPAUSE_PLAYER,

  nextTrack as nextTrackAc,
  playTrack as playTrackAc,
  pausePlayer as pausePlayerAc,
  setPlayerError as setPlayerErrorAc,
  setPlayerActuallyPlaying as setPlayerActuallyPlayingAc,

  getNextTrack,
  getPreviousTrack,
  playerElementId,

  getPlayerInstance,
} from './index'

const win = window as any

const playerErrorMessage = 'Sorry, we could not play that track right now.'

let timeoutId: number

function* nextTrack() {
  try {
    const state = yield select()
    const nextTrack = getNextTrack(state)

    if (!nextTrack) return

    yield put(playTrackAc(nextTrack))
  } catch (err) {
    // console.log(err)
  }
}

function* pausePlayer() {
  const playerInstance = getPlayerInstance()

  try {
    playerInstance.pause()
    yield put(setPlayerActuallyPlayingAc(false))
  } catch (err) {
    // console.log(err)
  }
}

function* playTrack({ payload: track }: any) {
  yield put(setPlayerActuallyPlayingAc(false))
  yield put(setPlayerErrorAc(null))

  window.clearTimeout(timeoutId)

  timeoutId = window.setTimeout(function() {
    const actuallyPlaying = win?.STORE.getState()?.player.actuallyPlaying
    const playing = win?.STORE.getState()?.player.playing

    if (playing && !actuallyPlaying) {
      ReactGA.event({
        category: 'Errors',
        action: 'Failed to stream: ' + track.slug + '. Timeout.',
      })

      win.STORE.dispatch(setPlayerErrorAc(playerErrorMessage))
      win.STORE.dispatch(pausePlayerAc())
    }
  }, 10000)

  const player = getPlayerInstance()
  player.src = track.resource
  player.play()
}

function* previousTrack() {
  try {
    const state = yield select()
    const previousTrack = getPreviousTrack(state)

    if (!previousTrack) return

    yield put(playTrackAc(previousTrack))
  } catch (err) {
    // console.log(err)
  }
}

function* seekPlayer({ payload: percent }: any) {
  try {
    const player = getPlayerInstance()
    player.currentTime = player.duration * percent
  } catch (err) {
    // console.log(err)
  }
}

function* setPlayerInstance() {
  try {
    const playerEl = document.createElement('audio')
    playerEl.id = playerElementId
    playerEl.controls = false

    playerEl.addEventListener('play', function() {
      win.STORE.dispatch(setPlayerActuallyPlayingAc(true))
    })

    playerEl.addEventListener('ended', function() {
      win.STORE.dispatch(nextTrackAc())
    })

    document.body.appendChild(playerEl)
  } catch (err) {
    // console.log(err)
  }
}

function* trackEnded() {
  try {
    yield put(nextTrackAc())
  } catch (err) {
    // console.log(err)
  }
}

function* unpausePlayer() {
  try {
    const playerInstance = getPlayerInstance()
    playerInstance.play()
    yield put(setPlayerActuallyPlayingAc(true))
  } catch (err) {
    // console.log(err)
  }
}

//--//

function* nextTrackSaga() {
  yield takeLatest(NEXT_TRACK, nextTrack)
}

function* pausePlayerSaga() {
  yield takeLatest(PAUSE_PLAYER, pausePlayer)
}

function* playPlayerSaga() {
  yield takeLatest(PLAY_TRACK, playTrack)
}

function* previousTrackSaga() {
  yield takeLatest(PREVIOUS_TRACK, previousTrack)
}

function* seekPlayerSaga() {
  yield takeLatest(SEEK_PLAYER, seekPlayer)
}

function* setPlayerInstanceSaga() {
  yield takeLatest(SET_PLAYER_INSTANCE, setPlayerInstance)
}

function* trackEndedSaga() {
  yield takeLatest(TRACK_ENDED, trackEnded)
}

function* unpausePlayerSaga() {
  yield takeLatest(UNPAUSE_PLAYER, unpausePlayer)
}

export {
  nextTrackSaga,
  pausePlayerSaga,
  playPlayerSaga,
  previousTrackSaga,
  seekPlayerSaga,
  setPlayerInstanceSaga,
  trackEndedSaga,
  unpausePlayerSaga,
}
