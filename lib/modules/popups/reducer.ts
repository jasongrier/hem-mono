import { AnyAction } from 'redux'
import produce from 'immer'
import {
  CLOSE_POPUP,
  OPEN_POPUP,

  IState,
} from './index'

const initialState: IState = {
  currentlyOpenPopUp: null,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case OPEN_POPUP: {
      return produce(state, draftState => {
        draftState.currentlyOpenPopUp = payload
      })
    }

    case CLOSE_POPUP: {
      return produce(state, draftState => {
        draftState.currentlyOpenPopUp = null
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
