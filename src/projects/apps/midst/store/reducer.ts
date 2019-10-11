import { AnyAction } from 'redux'
import {
  SOME_ACTION,

  IState,
} from './types'

const initialState: IState = {

}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SOME_ACTION:
      return { ...state, foo: payload }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
