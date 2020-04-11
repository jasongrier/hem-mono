import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  MUTE_PLAYER,
  PAUSE_PLAYER,
  PLAY_PLAYER,
  UNMUTE_PLAYER,
  UNPAUSE_PLAYER,

  setPlayerInstance as setPlayerInstanceAc,
  unmutePlayer as unmutePlayerAc,
} from './index'

declare const SC: any

function* mutePlayer() {
  const state = yield select()
  const { playerInstance } = state.player

  try {
    playerInstance.setVolume(0)
  } catch (err) {
    console.log(err)
  }
}

function* pausePlayer() {
  const state = yield select()
  const { playerInstance } = state.player

  try {
    playerInstance.pause()
  } catch (err) {
    console.log(err)
  }
}

function* playPlayer({ payload }: any) {
  try {
    const player = yield call(SC.stream, '/tracks/' + payload.resource)

    yield put(setPlayerInstanceAc(player))
    yield put(unmutePlayerAc())

    player.play()

  } catch (err) {
    console.log(err)
  }
}

function* unmutePlayer() {
  const state = yield select()
  const { playerInstance } = state.player

  try {
    playerInstance.setVolume(1)
  } catch (err) {
    console.log(err)
  }
}

function* unpausePlayer() {
  const state = yield select()
  const { playerInstance } = state.player

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

function* pausePlayerSaga() {
  yield takeLatest(PAUSE_PLAYER, pausePlayer)
}

function* playPlayerSaga() {
  yield takeLatest(PLAY_PLAYER, playPlayer)
}

function* unmutePlayerSaga() {
  yield takeLatest(UNMUTE_PLAYER, unmutePlayer)
}

function* unpausePlayerSaga() {
  yield takeLatest(UNPAUSE_PLAYER, unpausePlayer)
}

export {
  mutePlayerSaga,
  pausePlayerSaga,
  playPlayerSaga,
  unmutePlayerSaga,
  unpausePlayerSaga,
}
