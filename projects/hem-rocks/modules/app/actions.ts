import { AnyAction } from 'redux'
import {
  SET_COOKIE_APPROVAL,
  SET_COOKIE_PREFERENCES_SET,
  SET_MEGA_NAV_OPEN,
  SET_PRICING_MODE,
  SET_PROJECT,
} from './index'

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

const setPricingMode = (pricingMode: number): AnyAction => ({
  type: SET_PRICING_MODE,
  payload: pricingMode,
})

const setProject = (project: string): AnyAction => ({
  type: SET_PROJECT,
  payload: project,
})

export {
  setCookieApproval,
  setCookiePreferencesSet,
  setMegaNavOpen,
  setPricingMode,
  setProject,
}
