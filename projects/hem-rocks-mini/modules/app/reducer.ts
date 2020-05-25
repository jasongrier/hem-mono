import { AnyAction } from 'redux'
import produce from 'immer'
import {
  COLLAPSE_TOP_BAR,
  EXPAND_TOP_BAR,
  REQUEST_ACTIVE_LIVE_STREAM,
  SET_ACTIVE_LIVE_STREAM,

  IState,
} from './index'

const initialState: IState = {
  activeLiveStream: null,
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

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
