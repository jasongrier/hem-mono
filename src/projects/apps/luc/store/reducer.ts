import { AnyAction } from 'redux'
import {
  PLACEHOLDER_ACTION,

  IState,
} from './types'

const initialState: IState = {
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case PLACEHOLDER_ACTION:
      return { ...state }


    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
