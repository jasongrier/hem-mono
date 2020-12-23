import { AnyAction } from 'redux'

export interface IWebMovieFrame {
  fileName: string
  loaded: boolean
}

export interface IWebMovieClip {
  frames: IWebMovieFrame[]
  name: string
}

export interface IWebMovie {
  clips: IWebMovieClip[]
  slug: string
  src: string
  title: string
}

export interface IState {
  currentMovieIndex: number
  movies: IWebMovie[]
}

export const MOVIE_ADD = 'MOVIE_ADD'
export const MOVIE_REQUEST = 'MOVIE_REQUEST'
export const SET_CURRENT_MOVIE = 'SET_CURRENT_MOVIE'

export interface IMovieAdd extends AnyAction {
  type: typeof MOVIE_ADD
  payload: IWebMovie
}

export interface IMovieRequest extends AnyAction {
  type: typeof MOVIE_REQUEST
  payload: string
}

export interface ISetCurrentMovie extends AnyAction {
  type: typeof SET_CURRENT_MOVIE
  payload: number
}

export type Action =
  IMovieAdd
  | IMovieRequest
  | ISetCurrentMovie

export {
  movieAdd,
  movieRequest,
  setCurrentMovie,
} from './actions'

export {
  WebMovie,
} from './components'

export { reducer as webMovieReducer } from './reducer'

export {
  someSideEffectSaga,
} from './sagas'

export {
  modelize,
} from './functions'
