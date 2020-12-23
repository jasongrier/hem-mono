import { AnyAction } from 'redux'
import produce from 'immer'
import {
  MOVIE_ADD,
  MOVIE_REQUEST,
  SET_CURRENT_MOVIE,

  IState,
} from './index'

const initialState: IState = {
  currentMovieIndex: null,
  movies: [],
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case MOVIE_ADD: {
      return produce(state, draftState => {
        draftState.currentMovieIndex = payload
      })
    }

    case MOVIE_REQUEST: {
      return state
    }

    case SET_CURRENT_MOVIE: {
      return produce(state, draftState => {
        draftState.currentMovieIndex = payload
      })
    }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
