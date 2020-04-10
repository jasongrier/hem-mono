import { AnyAction } from 'redux'

export interface IState {
  activated: boolean
  currentTag: string | null
  topBarCollapsed: boolean
}

export const ACTIVATE_APP = 'ACTIVATE_APP'
export const SET_CURRENT_TAG = 'SET_CURRENT_TAG'
export const SET_TOP_BAR_COLLAPSED = 'SET_TOP_BAR_COLLAPSED'

export interface IActivateApp extends AnyAction {
  type: typeof ACTIVATE_APP
  payload: null
}

export interface ISetCurrentTag extends AnyAction {
  type: typeof SET_CURRENT_TAG
  payload: string
}

export interface ISetTopBarCollapsed extends AnyAction {
  type: typeof SET_TOP_BAR_COLLAPSED
  payload: boolean
}

export type Action = IActivateApp | ISetTopBarCollapsed | ISetCurrentTag

export { activateApp, setTopBarCollapsed, setCurrentTag } from './actions'

export { App } from './components'

export { reducer as appReducer } from './reducer'
