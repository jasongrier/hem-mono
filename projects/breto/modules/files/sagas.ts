import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  ADD_FILE,
} from './index'

function* addFile({ payload: file }: any) {
  try {
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* filesSaga() {
  yield takeLatest(ADD_FILE, addFile)
}

export {
  filesSaga,
}
