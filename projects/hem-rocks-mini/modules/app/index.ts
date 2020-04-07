import { AnyAction } from 'redux'

export interface IState {
  foo: any
}

export const SOME_ACTION = 'SOME_ACTION'

export interface ISomeAction extends AnyAction {
  type: typeof SOME_ACTION
  payload: null
}

export type Action = ISomeAction

export { someAction } from './actions'

export { App } from './components'

export { reducer as appReducer } from './reducer'
