import { AnyAction } from 'redux'

export interface IState {
  activated: boolean
}

export const ACTIVATE_APP = 'ACTIVATE_APP'

export interface IActivateApp extends AnyAction {
  type: typeof ACTIVATE_APP
  payload: null
}

export type Action = IActivateApp

export { activateApp } from './actions'

export { App } from './components'

export { reducer as appReducer } from './reducer'
