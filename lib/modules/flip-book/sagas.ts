import { call, put, select, takeLatest } from 'redux-saga/effects'
import { find } from 'lodash'
import {
  IMAGES_REQUEST,
  REGISTER_FLIP_BOOK,

  imagesLoad as imagesLoadAc,
  updateFrame as updateFrameAc,
  updateLoaded as updateLoadedAc,
} from './index'

declare const window: any

const subscribers = []
let beat = 1

function tick() {
  beat = beat < 10 ? beat + 1 : 1

  for (const subscriber of subscribers) {
    subscriber(beat)
  }

  requestAnimationFrame(tick)
}

tick()

function* registerFlipBook({ payload }: any) {
  try {
    const { id } = payload

    subscribers.push(function flip(beat: number) {
      if (beat === 1) {
        window.STORE.dispatch(updateFrameAc(id))
      }
    })
  }

  catch (err) {
    console.error(err)
  }
}

function* imagesLoad({ payload }: any) {
  try {
    const { id, urls } = payload
    const frames = []
    const images = []

    for (const i in urls) {
      images[i] = new Image()
      images[i].onload = function() {
        frames.push(urls[i])

        if (frames.length === urls.length) {
          window.STORE.dispatch(imagesLoadAc(id, frames))
        }

        else {
          window.STORE.dispatch(updateLoadedAc(id, frames.length / urls.length))
        }
      }
      images[i].src = urls[i]
    }
  }

  catch (err) {
    console.error(err)
  }
}

//--//

function* flipBooksSaga() {
  yield takeLatest(IMAGES_REQUEST, imagesLoad)
  yield takeLatest(REGISTER_FLIP_BOOK, registerFlipBook)
}

export {
  flipBooksSaga,
}
