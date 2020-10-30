import { AnyAction } from 'redux'
import produce from 'immer'
import {
  IState,
} from './index'

const initialState: IState = {
}

const reducer = (
  state: IState = initialState,
  { payload, type }: AnyAction,
): IState => {
  switch (type) {
    case ADMIN_APPLY_FILTER: {
      return produce(state, draftState => {
        draftState.adminFilterApplied = payload
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
