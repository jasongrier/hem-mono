import { AnyAction } from 'redux'
import produce from 'immer'
import { capitalize } from 'voca'
import {
  COLLAPSE_TOP_BAR,
  EXPAND_TOP_BAR,
  REQUEST_ACTIVE_LIVE_STREAM,
  SET_ACTIVE_LIVE_STREAM,
  SET_COOKIE_APPROVAL,
  SET_COOKIE_PREFERENCES_SET,
  SET_MEGA_NAV_OPEN,
  SET_PRICING_MODE,

  IState,
} from './index'

const initialState: IState = {
  activeLiveStream: null,
  cookiesAnalyticsApproved: false,
  cookiesMarketingApproved: false,
  cookiePreferencesSet: false,
  megaNavOpen: false,
  pricingMode: 1,
  topBarCollapsed: false,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case COLLAPSE_TOP_BAR: {
      return produce(state, draftState => {
        draftState.topBarCollapsed = true
      })
    }

    case EXPAND_TOP_BAR: {
      return produce(state, draftState => {
        draftState.topBarCollapsed = false
      })
    }

    case REQUEST_ACTIVE_LIVE_STREAM: {
      return state
    }

    case SET_ACTIVE_LIVE_STREAM: {
      return produce(state, draftState => {
        draftState.activeLiveStream = payload
      })
    }

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
