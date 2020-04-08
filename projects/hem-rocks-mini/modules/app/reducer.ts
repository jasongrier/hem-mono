import { AnyAction } from 'redux'
import produce from 'immer'
import {
  ACTIVATE_APP,
  SET_CURRENT_TAG,
  SET_TOP_BAR_COLLAPSED,

  IState,
} from './index'

const initialState: IState = {
  activated: true,
  currentTag: null,
  topBarCollapsed: false,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case ACTIVATE_APP: {
      return produce(state, draftState => {
        draftState.activated = true
      })
    }

    case SET_CURRENT_TAG: {
      return produce(state, draftState => {
        draftState.currentTag = payload
      })
    }

    case SET_TOP_BAR_COLLAPSED: {
      return produce(state, draftState => {
        draftState.topBarCollapsed = payload
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
