import { AnyAction } from 'redux'
import produce from 'immer'
import {
  ADD_PRODUCT_TO_CART,
  CLEAR_CART,
  REMOVE_PRODUCT_FROM_CART,
  REQUEST_SALE,
  SET_CART_PRODUCTS,
  SET_CURRENT_SALE,
  SUBMIT_SALE,

  IState,
} from './index'

const initialState: IState = {
  currentSale: null,
  products: [],
  redirecting: false,
}

const reducer = (
  state: IState = initialState,
  { payload, type }: AnyAction,
): IState => {
  switch (type) {
    case ADD_PRODUCT_TO_CART: {
      return produce(state, draftState => {
        draftState.products = draftState.products.concat([payload])
      })
    }

    case CLEAR_CART: {
      return produce(state, draftState => {
        draftState.products = []
      })
    }

    case REMOVE_PRODUCT_FROM_CART: {
      return produce(state, draftState => {
        draftState.products = draftState.products.filter(product =>
          product.slug !== payload
        )
      })
    }

    case REQUEST_SALE: {
      return state
    }

    case SET_CART_PRODUCTS: {
      return produce(state, draftState => {
        draftState.products = payload
      })
    }

    case SET_CURRENT_SALE: {
      return produce(state, draftState => {
        draftState.currentSale = payload
      })
    }

    case SUBMIT_SALE: {
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
