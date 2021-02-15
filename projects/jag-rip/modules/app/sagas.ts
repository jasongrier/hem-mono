import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  SOME_ACTION,

  someAction as someActionAc
} from './index'

function* someAction() {
  try {

  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* someSaga() {
  yield takeLatest(SOME_ACTION, someAction)
}

export { someSaga }
