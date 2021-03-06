import { AnyAction } from 'redux'
import produce from 'immer'
import { capitalize } from 'voca'
import {
  SET_COOKIE_APPROVAL,
  SET_COOKIE_PREFERENCES_SET,
  SET_IS_LANDING_PAGE,
  SET_MEGA_NAV_OPEN,
  SET_PRICING_MODE,

  IState,
} from './index'

const initialState: IState = {
  cookiesAnalyticsApproved: false,
  cookiesMarketingApproved: false,
  cookiePreferencesSet: false,
  isLandingPage: false,
  megaNavOpen: false,
  pricingMode: 1,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SET_COOKIE_APPROVAL: {
      return produce(state, draftState => {
        const { cookieName, approval } = payload
        // @ts-ignore
        draftState[`cookies${capitalize(cookieName)}Approved`] = approval
      })
    }

    case SET_COOKIE_PREFERENCES_SET: {
      return produce(state, draftState => {
        draftState.cookiePreferencesSet = payload.value
      })
    }

    case SET_IS_LANDING_PAGE: {
      return produce(state, draftState => {
        draftState.isLandingPage = payload
      })
    }

    case SET_MEGA_NAV_OPEN: {
      return produce(state, draftState => {
        draftState.megaNavOpen = payload
      })
    }

    case SET_PRICING_MODE: {
      return produce(state, draftState => {
        draftState.pricingMode = payload
      })
    }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
