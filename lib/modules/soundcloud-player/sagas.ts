import { call, put, select, takeLatest } from 'redux-saga/effects'
import ReactGA from 'react-ga'
import {
  MUTE_PLAYER,
  NEXT_TRACK,
  PAUSE_PLAYER,
  CUE_TRACK,
  PREVIOUS_TRACK,
  SEEK_PLAYER,
  TRACK_ENDED,
  UNMUTE_PLAYER,
  UNPAUSE_PLAYER,

  nextTrack as nextTrackAc,
  cueTrack as cueTrackAc,
  pausePlayer as pausePlayerAc,
  setPlayerError as setPlayerErrorAc,
  setPlayerActuallyPlaying as setPlayerActuallyPlayingAc,
  trackEnded as trackEndedAc,
  unmutePlayer as unmutePlayerAc,

  getNextTrack,
  getPreviousTrack,
} from './index'

declare const SC: any
declare const window: any

const playerErrorMessage = 'Sorry, we could not play that track right now.'

let timeoutId: number

function killPlayerInstance() {
  const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

  if (!playerInstance) return
  playerInstance.pause()
  window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE = undefined
}

function* mutePlayer() {
  const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

  try {
    playerInstance.setVolume(0)
  } catch (err) {
    // console.log(err)
  }
}

function* nextTrack() {
  try {
    const state = yield select()
    const { actuallyPlaying: wasPlaying } = state.player
    const nextTrack = getNextTrack(state)

    if (!nextTrack) return

    yield put(cueTrackAc(nextTrack, wasPlaying))
  } catch (err) {
    // console.log(err)
  }
}

function* pausePlayer() {
  const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

  try {
    playerInstance.pause()
    yield put(setPlayerActuallyPlayingAc(false))
  } catch (err) {
    // console.log(err)
  }
}

function* cueTrack({ payload }: any) {
  yield put(setPlayerActuallyPlayingAc(false))
  yield put(setPlayerErrorAc(null))
  yield put(setPlayerErrorAc(null))

  killPlayerInstance()

  window.clearTimeout(timeoutId)

  timeoutId = window.setTimeout(function() {
    const actuallyPlaying = window?.STORE.getState()?.player.actuallyPlaying
    const playing = window?.STORE.getState()?.player.playing

    if (playing && !actuallyPlaying) {
      ReactGA.event({
        category: 'Errors',
        action: 'Failed to stream: ' + payload.track.slug + '. Timeout.',
      })

      window.STORE.dispatch(setPlayerErrorAc(playerErrorMessage))
      window.STORE.dispatch(pausePlayerAc())
    }
  }, 10000)

  SC.stream(
    '/tracks/' + payload.track.resource,
    payload.track.secret,
  )
    .then(function(player: any) {
      window.clearTimeout(timeoutId)

      player.on('finish', function() {
        window.STORE.dispatch(trackEndedAc())
      })

      player.on('play-start', function() {
        window.STORE.dispatch(setPlayerActuallyPlayingAc(true))
      })

      window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE = player

      if (payload.andPlay) {
        player.play()
      }
    })
    .catch(function() {
      window.clearTimeout(timeoutId)

      ReactGA.event({
        category: 'Errors',
        action: 'Failed to stream: ' + payload.track.slug + '. HTTP error.',
      })

      window.STORE.dispatch(setPlayerErrorAc(playerErrorMessage))
      window.STORE.dispatch(pausePlayerAc())
    })
}

function* previousTrack() {
  try {
    const state = yield select()
    const { actuallyPlaying: wasPlaying } = state.player
    const previousTrack = getPreviousTrack(state)

    if (!previousTrack) return

    yield put(cueTrackAc(previousTrack, wasPlaying))
  } catch (err) {
    // console.log(err)
  }
}

function* seekPlayer({ payload: percent }: any) {
  try {
    const player = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE
    const duration = player.getDuration()
    const time = duration * percent

    player.seek(time)

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

function* unmutePlayer() {
  const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

  try {
    playerInstance.setVolume(1)
  } catch (err) {
    // console.log(err)
  }
}

function* unpausePlayer() {
  const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

  try {
    playerInstance.play()
    yield put(unmutePlayerAc())
    yield put(setPlayerActuallyPlayingAc(true))
  } catch (err) {
    // console.log(err)
  }
}

//--//

function* mutePlayerSaga() {
  yield takeLatest(MUTE_PLAYER, mutePlayer)
}

function* nextTrackSaga() {
  yield takeLatest(NEXT_TRACK, nextTrack)
}

function* pausePlayerSaga() {
  yield takeLatest(PAUSE_PLAYER, pausePlayer)
}

function* playPlayerSaga() {
  yield takeLatest(CUE_TRACK, cueTrack)
}

function* previousTrackSaga() {
  yield takeLatest(PREVIOUS_TRACK, previousTrack)
}

function* seekPlayerSaga() {
  yield takeLatest(SEEK_PLAYER, seekPlayer)
}

function* trackEndedSaga() {
  yield takeLatest(TRACK_ENDED, trackEnded)
}

function* unmutePlayerSaga() {
  yield takeLatest(UNMUTE_PLAYER, unmutePlayer)
}

function* unpausePlayerSaga() {
  yield takeLatest(UNPAUSE_PLAYER, unpausePlayer)
}

export {
  mutePlayerSaga,
  nextTrackSaga,
  pausePlayerSaga,
  playPlayerSaga,
  previousTrackSaga,
  seekPlayerSaga,
  trackEndedSaga,
  unmutePlayerSaga,
  unpausePlayerSaga,
}
