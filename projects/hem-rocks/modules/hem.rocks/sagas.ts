import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  SOME_ACTION,

  someAction as someActionAc,
} from './index'

function* someAction({ payload }: any) {
  try {
    yield put(someActionAc(true))
  }

  catch (err) {
    console.error(err)
  }
}

//--//

function* someSaga() {
  yield takeLatest(SOME_ACTION, someAction)
}

export {
  someSaga,
}
