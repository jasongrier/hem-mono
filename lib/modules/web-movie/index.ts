import { AnyAction } from 'redux'

export interface IWebMovieFrame {
  src: string
  id: string
  loaded: boolean
}

export interface IWebMovieClip {
  frames: IWebMovieFrame[]
  id: string
  loaded: boolean
  name: string
}

export interface IWebMovie {
  clips: IWebMovieClip[]
  id: string
  loaded: boolean
  slug: string
  src: string
  title: string
}

export interface IState {
  currentMovieIndex: number | null
  movies: IWebMovie[]
}

export const MARK_LOADED = 'MARK_LOADED'
export const MOVIE_ADD = 'MOVIE_ADD'
export const MOVIE_REQUEST = 'MOVIE_REQUEST'
export const SET_CURRENT_MOVIE = 'SET_CURRENT_MOVIE'

export interface IMarkLoaded extends AnyAction {
  type: typeof MARK_LOADED
  payload: string
}

export interface IMovieAdd extends AnyAction {
  type: typeof MOVIE_ADD
  payload: IWebMovie
}

export interface IMovieRequest extends AnyAction {
  type: typeof MOVIE_REQUEST
  payload: string | string[]
}

export interface ISetCurrentMovie extends AnyAction {
  type: typeof SET_CURRENT_MOVIE
  payload: number
}

export type Action =
  IMarkLoaded
  | IMovieAdd
  | IMovieRequest
  | ISetCurrentMovie

export {
  markLoaded,
  movieAdd,
  movieRequest,
  setCurrentMovie,
} from './actions'

export {
  WebMovie,
  WebMoviePlayer,
} from './components'

export { reducer as webMovieReducer } from './reducer'

export {
  webMovieSaga,
} from './sagas'

export {
  modelize,
} from './functions'
