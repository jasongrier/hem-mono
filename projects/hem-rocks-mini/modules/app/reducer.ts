import { AnyAction } from 'redux'
import produce from 'immer'
import {
  ACTIVATE_APP,

  IState,
} from './index'

const initialState: IState = {
  activated: false,
}

const reducer = (
  state: IState = initialState,
  { type }: AnyAction,
): IState => {
  switch (type) {
    case ACTIVATE_APP: {
      return produce(state, draftState => {
        draftState.activated = true
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
