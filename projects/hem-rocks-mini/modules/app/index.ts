import { AnyAction } from 'redux'

export interface IState {
  activeLiveStream: string | null
  cookiesAnalyticsApproved: boolean | null
  cookiesMarketingApproved: boolean | null
  topBarCollapsed: boolean
}

export const COLLAPSE_TOP_BAR = 'COLLAPSE_TOP_BAR'
export const EXPAND_TOP_BAR = 'EXPAND_TOP_BAR'
export const REQUEST_ACTIVE_LIVE_STREAM = 'REQUEST_ACTIVE_LIVE_STREAM'
export const SET_ACTIVE_LIVE_STREAM = 'SET_ACTIVE_LIVE_STREAM'
export const SET_COOKIE_APPROVAL = 'SET_COOKIE_APPROVAL'

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

export interface ISetCookieApproval extends AnyAction {
  type: typeof SET_COOKIE_APPROVAL
  payload: { cookieName: string, approval: boolean, write: boolean }
}

export type Action =
  ICollapseTopBar
  | IExpandTopBar
  | IRequestActiveLiveStream
  | ISetActiveLiveStream
  | ISetCookieApproval

export { collapseTopBar, expandTopBar, requestActiveLiveStream, setActiveLiveStream, setCookieApproval } from './actions'

// TODO: Export all components here. Write a linter for it
export { App, EmailForm, MainNavItem, PlayerBar, TopBar } from './components'

export { reducer as appReducer } from './reducer'

export { requestActiveLiveStreamSaga } from './sagas'
