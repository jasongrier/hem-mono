import { AnyAction } from 'redux'
import produce from 'immer'
import {
  CLOSE_POPUP,
  OPEN_POPUP,
  SET_POPUPS_FROZEN,

  IState,
} from './index'

const initialState: IState = {
  currentlyOpenPopUp: null,
  propsToChildren: null,
  frozen: false,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case OPEN_POPUP: {
      return produce(state, draftState => {
        if (state.frozen) return draftState
        draftState.currentlyOpenPopUp = payload.id
        draftState.propsToChildren = payload.propsToChildren
      })
    }

    case CLOSE_POPUP: {
      return produce(state, draftState => {
        if (state.frozen) return draftState
        draftState.currentlyOpenPopUp = null
      })
    }
    
    case SET_POPUPS_FROZEN: {
      return produce(state, draftState => {
        draftState.frozen = payload
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
