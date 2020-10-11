import {
  IMAGES_LOAD,
  IMAGES_REQUEST,
  REGISTER_FLIP_BOOK,
  UPDATE_FRAME,
  UPDATE_LOADED,

  Action,
} from './index'

const imagesLoad = (id: string, frames: string[]): Action => ({
  type: IMAGES_LOAD,
  payload: { id, frames },
})

const imagesRequest = (id: string, urls: string[]): Action => ({
  type: IMAGES_REQUEST,
  payload: { id, urls },
})

const registerFlipBook = (id: string, autoplay: boolean): Action => ({
  type: REGISTER_FLIP_BOOK,
  payload: { id, autoplay }
})

const updateFrame = (id: string): Action => ({
  type: UPDATE_FRAME,
  payload: id,
})

const updateLoaded = (id: string, loaded: number): Action => ({
  type: UPDATE_LOADED,
  payload: { id, loaded },
})

export {
  imagesLoad,
  imagesRequest,
  registerFlipBook,
  updateFrame,
  updateLoaded,
}
