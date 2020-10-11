import { AnyAction } from 'redux'

export interface IState {
  activeLiveStream: string | null
  cookiesAnalyticsApproved: boolean | null
  cookiesMarketingApproved: boolean | null
  cookiePreferencesSet: boolean | null
  megaNavOpen: boolean
  pricingMode: number // 1 = Pay what you want, 2 = Donate while downloading
  topBarCollapsed: boolean
}

export const COLLAPSE_TOP_BAR = 'COLLAPSE_TOP_BAR'
export const EXPAND_TOP_BAR = 'EXPAND_TOP_BAR'
export const REQUEST_ACTIVE_LIVE_STREAM = 'REQUEST_ACTIVE_LIVE_STREAM'
export const SET_ACTIVE_LIVE_STREAM = 'SET_ACTIVE_LIVE_STREAM'
export const SET_COOKIE_APPROVAL = 'SET_COOKIE_APPROVAL'
export const SET_COOKIE_PREFERENCES_SET = 'SET_COOKIE_PREFERENCES_SET'
export const SET_MEGA_NAV_OPEN = 'SET_MEGA_NAV_OPEN'
export const SET_PRICING_MODE = 'SET_PRICING_MODE'

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

export interface ISetCookiePreferencesSet extends AnyAction {
  type: typeof SET_COOKIE_PREFERENCES_SET
  payload: { value: boolean, write: boolean }
}

export interface ISetMegaNavOpen extends AnyAction {
  type: typeof SET_MEGA_NAV_OPEN
  payload: boolean
}

export interface ISetPricingMode extends AnyAction {
  type: typeof SET_PRICING_MODE
  payload: boolean
}

export type Action =
  ICollapseTopBar
  | IExpandTopBar
  | IRequestActiveLiveStream
  | ISetActiveLiveStream
  | ISetCookieApproval
  | ISetCookiePreferencesSet
  | ISetMegaNavOpen
  | ISetPricingMode

export {
  collapseTopBar,
  expandTopBar,
  requestActiveLiveStream,
  setActiveLiveStream,
  setCookieApproval,
  setCookiePreferencesSet,
  setMegaNavOpen,
  setPricingMode,
} from './actions'

// TODO: Export all components here. Write a linter for it
export {
  App,
  CookieSettings,
  EmailForm,
  HeaderPlayer,
  Popups,
} from './components'

export { getCookieBaseName, getCookieName } from './functions'
export { reducer as appReducer } from './reducer'
export { requestActiveLiveStreamSaga } from './sagas'
