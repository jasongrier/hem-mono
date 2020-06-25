import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  SOME_ACTION,

  someAction as someActionAc
} from './index'

function* someAction() {
  try {
    yield put(someActionAc())
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* someActionSaga() {
  yield takeLatest(SOME_ACTION, someAction)
}

export {
  someActionSaga,
}
