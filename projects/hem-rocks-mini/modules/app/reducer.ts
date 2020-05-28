import { AnyAction } from 'redux'
import produce from 'immer'
import {
  COLLAPSE_TOP_BAR,
  EXPAND_TOP_BAR,
  REQUEST_ACTIVE_LIVE_STREAM,
  SET_ACTIVE_LIVE_STREAM,
  SET_COOKIE_APPROVAL,
  SET_COOKIE_PREFERENCES_SET,

  IState,
} from './index'

const initialState: IState = {
  activeLiveStream: null,
  cookiesAnalyticsApproved: false,
  cookiesMarketingApproved: false,
  cookiePreferencesSet: false,
  topBarCollapsed: false,
}

// TODO: This should be the duck template in projects/template!!
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
        draftState[`cookies${cookieName}Approved`] = approval
      })
    }

    case SET_COOKIE_PREFERENCES_SET: {
      return produce(state, draftState => {
        draftState.cookiePreferencesSet = true
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
