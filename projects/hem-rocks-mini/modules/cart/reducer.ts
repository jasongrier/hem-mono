import { AnyAction } from 'redux'
import produce from 'immer'
import { clone } from 'lodash'
import {
  ADD_PRODUCT_TO_CART,
  CLEAR_CART,
  REMOVE_PRODUCT_FROM_CART,
  SET_CART_PRODUCTS,

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

    case SET_CART_PRODUCTS: {
      return produce(state, draftState => {
        draftState.products = payload
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
