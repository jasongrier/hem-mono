import { AnyAction } from 'redux'
import produce from 'immer'
import { map } from 'lodash'
import {
  MOVIE_ADD,
  MOVIE_REQUEST,
  SET_CURRENT_MOVIE,

  IState,
  MARK_LOADED,
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
    case MARK_LOADED: {
      return produce(state, draftState => {
        for (const movie of draftState.movies) {
          for (const clip of movie.clips) {
            for (const frame of clip.frames) {
              if (frame.id === payload) {
                frame.loaded = true

                if (!map(clip.frames, 'loaded').includes(false)) {
                  clip.loaded = true
                }

                if (!map(movie.clips, 'loaded').includes(false)) {
                  movie.loaded = true
                }
                break
              }
            }
          }
        }
      })
    }

    case MOVIE_ADD: {
      return produce(state, draftState => {
        draftState.movies = Array.from(draftState.movies).concat([payload])
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
