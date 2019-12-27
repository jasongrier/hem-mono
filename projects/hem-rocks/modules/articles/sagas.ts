import { call, put, select, takeLatest } from 'redux-saga/effects'
import { INDEX_REQUESTED } from './index'
import { indexReceived, indexRequested } from './actions'

function* fetchIndex({ payload }: ReturnType<typeof indexRequested>) {
  try {
    const res = yield call(fetch, `/static/content/compiled/${payload}/index.json`);
    const data = yield res.json()
    yield put(indexReceived(data))
  } catch (err) {
    console.log(err)
  }
}

function* indexSaga() {
  yield takeLatest(INDEX_REQUESTED, fetchIndex)
}

export {
  indexSaga,
}
