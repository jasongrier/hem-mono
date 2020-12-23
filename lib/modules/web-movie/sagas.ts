import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  MOVIE_REQUEST,

  movieAdd as movieAddAc,
  markLoaded as markLoadedAc,

  modelize,
} from './index'

declare const window: any

function* movieRequest({ payload: src }: any) {
  try {
    if (typeof src === 'string') {
      const res = yield call(fetch, src)
      const movieInfo = yield res.json()
      const movie = modelize(src, movieInfo)

      yield put(movieAddAc(movie))

      const images: Array<{ src: string, id: string, clip: string, el: HTMLImageElement }> = []

      for (const clip of movie.clips) {
        for (const frame of clip.frames) {
          images.push({ src: frame.src, id: frame.id, clip: clip.id, el: null })
        }
      }

      for (const image of images) {
        image.el = new Image()
        image.el.onload = function onImageLoad() {
          window.STORE.dispatch(markLoadedAc(image.id))
        }
        image.el.src = image.src
      }
    }

    else {
      throw new Error('Loading multiple movies is not supported yet, sorry')
    }
  } catch (err) {
    console.log(err)
  }
}

//--//

function* webMovieSaga() {
  yield takeLatest(MOVIE_REQUEST, movieRequest)
}

export {
  webMovieSaga,
}
