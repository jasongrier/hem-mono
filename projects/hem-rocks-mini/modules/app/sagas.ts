import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  REQUEST_ACTIVE_LIVE_STREAM,

  setActiveLiveStream as setActiveLiveStreamAc
} from './index'

function* requestActiveLiveStream() {
  try {
    const assetHost = window.location.hostname === 'localhost'
      ? 'http://localhost:8888'
      : 'http://static.hem.rocks'

    const res = yield call(fetch, `${assetHost}/hem-rocks/state/state.json`)
    const state = yield res.json()

    yield put(setActiveLiveStreamAc(state.activeLiveStream))
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* requestActiveLiveStreamSaga() {
  yield takeLatest(REQUEST_ACTIVE_LIVE_STREAM, requestActiveLiveStream)
}

export {
  requestActiveLiveStreamSaga,
}
