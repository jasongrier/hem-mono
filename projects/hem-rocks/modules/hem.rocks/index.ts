import { AnyAction } from 'redux'

export interface IState {
  foo: boolean
}

export const SOME_ACTION = 'SOME_ACTION'

export interface ISomeAction extends AnyAction {
  type: typeof SOME_ACTION
  payload: boolean
}


export type Action =
  ISomeAction

export {
  someAction,
} from './actions'

export { reducer as contentReducer } from './reducer'

export {
  ProjectFrame,
} from './components'

export {
} from './functions'

export {
  someSaga,
} from './sagas'
