import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  MUTE_PLAYER,
  NEXT_TRACK,
  PAUSE_PLAYER,
  PLAY_PLAYER,
  PREVIOUS_TRACK,
  TRACK_ENDED,
  UNMUTE_PLAYER,
  UNPAUSE_PLAYER,

  nextTrack as nextTrackAc,
  playPlayer as playPlayerAc,
  trackEnded as trackEndedAc,
  unmutePlayer as unmutePlayerAc,

  getNextTrack,
  getPreviousTrack,
} from './index'

declare const SC: any
declare const window: any

function* mutePlayer() {
  const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

  try {
    playerInstance.setVolume(0)
  } catch (err) {
    console.log(err)
  }
}

function* nextTrack() {
  try {
    const state = yield select()
    yield put(playPlayerAc(getNextTrack(state)))
  } catch (err) {
    console.log(err)
  }
}

function* pausePlayer() {
  const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

  try {
    playerInstance.pause()
  } catch (err) {
    console.log(err)
  }
}

function* playPlayer({ payload }: any) {
  SC.stream('/tracks/' + payload.resource)
    .then(function(player: any) {
      player.on('finish', function() {
        window.STORE.dispatch(trackEndedAc())
      })

      window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE = player

      player.play()
    })
}

function* previousTrack() {
  try {
    const state = yield select()
    yield put(playPlayerAc(getPreviousTrack(state)))
  } catch (err) {
    console.log(err)
  }
}

function* trackEnded() {
  try {
    yield put(nextTrackAc())
  } catch (err) {
    console.log(err)
  }
}

function* unmutePlayer() {
  const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

  try {
    playerInstance.setVolume(1)
  } catch (err) {
    console.log(err)
  }
}

function* unpausePlayer() {
  const playerInstance = window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE

  try {
    playerInstance.play()
    yield put(unmutePlayerAc())
  } catch (err) {
    console.log(err)
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
  yield takeLatest(PLAY_PLAYER, playPlayer)
}

function* previousTrackSaga() {
  yield takeLatest(PREVIOUS_TRACK, previousTrack)
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
  trackEndedSaga,
  unmutePlayerSaga,
  unpausePlayerSaga,
}
