import { AnyAction } from 'redux'
import {
  LOAD_PRODUCT,

  IState,
} from './types'

const initialState: IState = {
  product: null,
}

const reducer = (
  state: IState = initialState,
  { type }: AnyAction,
): IState => {
  switch (type) {
    case LOAD_PRODUCT: {
      return state
    }

    default: {
      return state
    }
  }
}

export {
  initialState,
  reducer,
}
