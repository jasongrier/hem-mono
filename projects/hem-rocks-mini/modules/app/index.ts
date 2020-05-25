import { AnyAction } from 'redux'

export interface IState {
  activeLiveStream: string | null
  topBarCollapsed: boolean
}

export const COLLAPSE_TOP_BAR = 'COLLAPSE_TOP_BAR'
export const EXPAND_TOP_BAR = 'EXPAND_TOP_BAR'
export const REQUEST_ACTIVE_LIVE_STREAM = 'REQUEST_ACTIVE_LIVE_STREAM'
export const SET_ACTIVE_LIVE_STREAM = 'SET_ACTIVE_LIVE_STREAM'

export interface ICollapseTopBar extends AnyAction {
  type: typeof COLLAPSE_TOP_BAR
  payload: null
}

export interface IExpandTopBar extends AnyAction {
  type: typeof EXPAND_TOP_BAR
  payload: null
}

export interface IRequestActiveLiveStream extends AnyAction {
  type: typeof REQUEST_ACTIVE_LIVE_STREAM
  payload: null
}

export interface ISetActiveLiveStream extends AnyAction {
  type: typeof SET_ACTIVE_LIVE_STREAM
  payload: string
}

export type Action =
  ICollapseTopBar
  | IExpandTopBar
  | IRequestActiveLiveStream
  | ISetActiveLiveStream

export { collapseTopBar, expandTopBar, requestActiveLiveStream, setActiveLiveStream } from './actions'

export { App, EmailForm, MainNavItem, PlayerBar, TopBar } from './components'

export { reducer as appReducer } from './reducer'

export { requestActiveLiveStreamSaga } from './sagas'
