import { AnyAction } from 'redux'

export interface IFlipBookRegistryEntry {
  autoplay: boolean
  currentFrame: number
  frames: string[]
  id: string
  loaded: number
  playing: boolean
}

export interface IState {
  flipBooks: IFlipBookRegistryEntry[]
}

export const IMAGES_LOAD = 'IMAGES_LOAD'
export const IMAGES_REQUEST = 'IMAGES_REQUEST'
export const REGISTER_FLIP_BOOK = 'REGISTER_FLIP_BOOK'
export const UPDATE_FRAME = 'UPDATE_FRAME'
export const UPDATE_LOADED = 'UPDATE_LOADED'

export interface IImagesLoad extends AnyAction {
  type: typeof IMAGES_LOAD
  payload: { id: string, frames: string[] }
}

export interface IImagesRequest extends AnyAction {
  type: typeof IMAGES_REQUEST
  payload: { id: string, urls: string[] }
}

export interface IRegisterFlipBook extends AnyAction {
  type: typeof REGISTER_FLIP_BOOK
  payload: { id: string, autoplay: boolean }
}

export interface IUpdateFrame extends AnyAction {
  type: typeof UPDATE_FRAME
  payload: string
}

export interface IUpdateLoaded extends AnyAction {
  type: typeof UPDATE_LOADED
  payload: { id: string, loaded: number }
}

export type Action =
  IImagesLoad
  | IImagesRequest
  | IRegisterFlipBook
  | IUpdateFrame
  | IUpdateLoaded

export {
  imagesLoad,
  imagesRequest,
  registerFlipBook,
  updateFrame,
  updateLoaded,
} from './actions'

export { FlipBook } from './components'
export { reducer as flipBooksReducer } from './reducer'
export { flipBooksSaga } from './sagas'
