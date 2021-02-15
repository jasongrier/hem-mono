import { AnyAction } from 'redux'

export interface IState {
  foo: string,
}

export const SOME_ACTION = 'SOME_ACTION'

export interface ISomeAction extends AnyAction {
  type: typeof SOME_ACTION
  payload: string
}

export type Action = ISomeAction

export { someAction } from './actions'

export { App } from './components'

// export { getCookieBaseName, getCookieName } from './functions'
export { reducer as appReducer } from './reducer'

export { someSaga } from './sagas'
