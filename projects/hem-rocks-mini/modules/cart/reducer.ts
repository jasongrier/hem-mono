import { AnyAction } from 'redux'
import {
  SHOPIFY_ADD_TO_CART,

  IState,
} from './index'


const initialState: IState = {
  products: [],
  redirecting: false,
}

const reducer = (
  state: IState = initialState,
  { payload, type }: AnyAction,
): IState => {
  switch (type) {
    case SHOPIFY_ADD_TO_CART: {
      return state
    }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
