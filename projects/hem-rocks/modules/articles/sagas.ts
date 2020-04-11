import { call, put, select, takeLatest } from 'redux-saga/effects'
import { RootState } from '../../index'
import { INDEX_REQUESTED } from './index'
import { indexReceived } from './actions'

function* fetchIndex({ payload: pathToIndex }: any) {
  const state: RootState = yield select()

  if (state.articles.requests.indexOf(pathToIndex) > -1) return

  try {
    const res = yield call(fetch, `/static/content/compiled/${pathToIndex}/index.json`)
    const articles = yield res.json()

    yield put(indexReceived(articles, pathToIndex))
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
