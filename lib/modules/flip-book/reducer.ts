import { AnyAction } from 'redux'
import produce from 'immer'
import { find } from 'lodash'
import {
  IMAGES_LOAD,
  IMAGES_REQUEST,
  REGISTER_FLIP_BOOK,
  UPDATE_FRAME,
  UPDATE_LOADED,

  IState,
} from './index'

const initialState: IState = {
  flipBooks: [],
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case IMAGES_LOAD: {
      return produce(state, draftState => {
        const flipBook = find(draftState.flipBooks, { id: payload.id })

        if (!flipBook) return

        flipBook.frames = payload.frames

        if (flipBook.autoplay) {
          flipBook.playing = true
        }
      })
    }

    case REGISTER_FLIP_BOOK: {
      return produce(state, draftState => {
        if (find(draftState.flipBooks, { id: payload.id }))
          throw new Error('Flip book already exists: ' + payload.id)

        draftState.flipBooks.push({
          autoplay: payload.autoplay,
          currentFrame: 0,
          id: payload.id,
          frames: [],
          loaded: 0,
          playing: payload.playing,
        })
      })
    }

    case UPDATE_FRAME: {
      return produce(state, draftState => {
        const flipBook = find(draftState.flipBooks, { id: payload })

        if (!flipBook) return
        if (!flipBook.frames) return

        flipBook.currentFrame = flipBook.currentFrame < flipBook.frames.length - 1
          ? flipBook.currentFrame + 1
          : 0
      })
    }

    case UPDATE_LOADED: {
      return produce(state, draftState => {
        const flipBook = find(draftState.flipBooks, { id: payload.id })

        if (!flipBook) return

        flipBook.loaded = payload.loaded
      })
    }

    case IMAGES_REQUEST:
    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
