import {
  MARK_LOADED,
  MOVIE_ADD,
  MOVIE_REQUEST,
  SET_CURRENT_MOVIE,

  Action,
  IWebMovie,
} from './index'

const markLoaded = (id: string): Action => ({
  type: MARK_LOADED,
  payload: id,
})

const movieAdd = (movie: IWebMovie): Action => ({
  type: MOVIE_ADD,
  payload: movie,
})

const movieRequest = (src: string | string[]): Action => ({
  type: MOVIE_REQUEST,
  payload: src,
})

const setCurrentMovie = (index: number): Action => ({
  type: SET_CURRENT_MOVIE,
  payload: index,
})

export {
  markLoaded,
  movieAdd,
  movieRequest,
  setCurrentMovie,
}
