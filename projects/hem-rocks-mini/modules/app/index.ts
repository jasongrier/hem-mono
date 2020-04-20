import { AnyAction } from 'redux'

export interface IState {
  topBarCollapsed: boolean
}

export const COLLAPSE_TOP_BAR = 'COLLAPSE_TOP_BAR'
export const EXPAND_TOP_BAR = 'EXPAND_TOP_BAR'

export interface ICollapseTopBar extends AnyAction {
  type: typeof COLLAPSE_TOP_BAR
  payload: null
}

export interface IExpandTopBar extends AnyAction {
  type: typeof EXPAND_TOP_BAR
  payload: null
}

export type Action = ICollapseTopBar | IExpandTopBar

export { collapseTopBar, expandTopBar } from './actions'

export { App, EmailForm, MainNavItem, PlayerBar, TopBar } from './components'

export { reducer as appReducer } from './reducer'
