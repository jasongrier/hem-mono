import { AnyAction } from 'redux'

export interface IState {
  foo: string
}

export const SOME_ACTION = 'SOME_ACTION'

/* TODO: These are not alphabetised, make a linter for this */
export interface ISomeAction extends AnyAction {
  type: typeof SOME_ACTION
  payload: string
}

export type Action = ISomeAction

export {
  someAction,
} from './actions'

export {
  WebMovie,
} from './components'

export { reducer as webMovieReducer } from './reducer'

export {
  someSideEffectSaga,
} from './sagas'

export {
  someFunction,
} from './functions'
