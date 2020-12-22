import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  SOME_ACTION,

  someAction as someActionAc,

  someFunction,
} from './index'

function* someSideEffect() {
  try {
    yield put(someActionAc('bar'))
  } catch (err) {
    // console.log(err)
  }
}

//--//

function* someSideEffectSaga() {
  yield takeLatest(SOME_ACTION, someSideEffect)
}

export {
  someSideEffectSaga,
}
