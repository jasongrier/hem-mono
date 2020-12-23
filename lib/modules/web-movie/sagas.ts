import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  MOVIE_REQUEST,

  movieAdd as movieAddAc,

  modelize,
  IWebMovie,
} from './index'

function* movieRequest({ payload: src }: any) {
  try {
    const res = yield call(fetch, src)
    const movieInfo = yield res.json()
    const movie = modelize(src, movieInfo)

    yield put(movieAddAc(movie))
  } catch (err) {
    // console.log(err)
  }
}

//--//

function* someSideEffectSaga() {
  yield takeLatest(MOVIE_REQUEST, movieRequest)
}

export {
  someSideEffectSaga,
}
