import { AnyAction } from 'redux'
import {
  COLLAPSE_TOP_BAR,
  EXPAND_TOP_BAR,
  REQUEST_ACTIVE_LIVE_STREAM,
  SET_ACTIVE_LIVE_STREAM,
  SET_COOKIE_APPROVAL,
  SET_COOKIE_PREFERENCES_SET,
  SET_MEGA_NAV_OPEN,
} from './index'

const collapseTopBar = (): AnyAction => ({
  type: COLLAPSE_TOP_BAR,
  payload: null,
})

const expandTopBar = (): AnyAction => ({
  type: EXPAND_TOP_BAR,
  payload: null,
})

const requestActiveLiveStream = (): AnyAction => ({
  type: REQUEST_ACTIVE_LIVE_STREAM,
  payload: null,
})

const setActiveLiveStream = (contentItemSlug: string): AnyAction => ({
  type: SET_ACTIVE_LIVE_STREAM,
  payload: contentItemSlug,
})

const setCookieApproval = (cookieName: string, approval: boolean, write: boolean): AnyAction => ({
  type: SET_COOKIE_APPROVAL,
  payload: { cookieName, approval, write },
})

const setCookiePreferencesSet = (value: boolean, write: boolean): AnyAction => ({
  type: SET_COOKIE_PREFERENCES_SET,
  payload: { value, write },
})

const setMegaNavOpen = (open: boolean): AnyAction => ({
  type: SET_MEGA_NAV_OPEN,
  payload: open,
})

export {
  collapseTopBar,
  expandTopBar,
  requestActiveLiveStream,
  setActiveLiveStream,
  setCookieApproval,
  setCookiePreferencesSet,
  setMegaNavOpen,
}
