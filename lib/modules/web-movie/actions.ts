import {
  MOVIE_ADD,
  MOVIE_REQUEST,
  SET_CURRENT_MOVIE,

  Action,
  IWebMovie,
} from './index'

const movieAdd = (movie: IWebMovie): Action => ({
  type: MOVIE_ADD,
  payload: movie,
})

const movieRequest = (src: string): Action => ({
  type: MOVIE_REQUEST,
  payload: src,
})

const setCurrentMovie = (index: number): Action => ({
  type: SET_CURRENT_MOVIE,
  payload: index,
})

export {
  movieAdd,
  movieRequest,
  setCurrentMovie,
}
