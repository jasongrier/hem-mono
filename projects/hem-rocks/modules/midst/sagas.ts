import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  // REQUEST_CREATE_ITEMS,
} from './index'

function* createItems({ payload }: any) {
  try {
  }

  catch (err) {
    console.error(err)
  }
}

//--//

function* midstSaga() {
  // yield takeLatest(REQUEST_CREATE_ITEMS, createItems)
}

export {
  midstSaga,
}
