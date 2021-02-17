import { AnyAction } from 'redux'

export enum SplitTests {
  FlexPricingType = 'flex-pricing-type',
}

export const curatedPlaylists = [
  {
    name: 'Player Featured',
    linkTo: '/tracks/filter/featured',
  },
  {
    name: 'Player Rare',
    linkTo: '/tracks/filter/rare',
  },
  {
    name: 'Player Live',
    linkTo: '/tracks/filter/live',
  },
  {
    name: 'Player Radio',
    linkTo: '/tracks/filter/radio',
  },
  {
    name: 'Player Sound Library',
    linkTo: '/sound-library',
  },
  {
    name: 'Player Releases',
    linkTo: '/label',
  },
]

export interface IState {
  currentProject: string,
  cookiesAnalyticsApproved: boolean | null
  cookiesMarketingApproved: boolean | null
  cookiePreferencesSet: boolean | null
  megaNavOpen: boolean
  pricingMode: number // 1 = Pay what you want, 2 = Donate while downloading
}

export const SET_COOKIE_APPROVAL = 'SET_COOKIE_APPROVAL'
export const SET_COOKIE_PREFERENCES_SET = 'SET_COOKIE_PREFERENCES_SET'
export const SET_MEGA_NAV_OPEN = 'SET_MEGA_NAV_OPEN'
export const SET_PRICING_MODE = 'SET_PRICING_MODE'
export const SET_PROJECT = 'SET_PROJECT'

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

export interface ISetProject extends AnyAction {
  type: typeof SET_PROJECT
  payload: string
}

export type Action =
  ISetCookieApproval
  | ISetCookiePreferencesSet
  | ISetMegaNavOpen
  | ISetPricingMode
  | ISetProject

export {
  setCookieApproval,
  setCookiePreferencesSet,
  setMegaNavOpen,
  setPricingMode,
  setProject,
} from './actions'

// TODO: Export all components here. Write a linter for it
export {
  App,
  CookieSettings,
  EmailForm,
  Popups,
} from './components'

export { getCookieBaseName, getCookieName } from './functions'

export { reducer as appReducer } from './reducer'

export { appSaga } from './sagas'
