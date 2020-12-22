import { AnyAction } from 'redux'
import produce from 'immer'
import uuid from 'uuid/v1'
import {
  SOME_ACTION,

  IState,
} from './index'

const initialState: IState = {
  foo: 'bar',
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SOME_ACTION: {
      return produce(state, draftState => {
        draftState.foo = payload
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
