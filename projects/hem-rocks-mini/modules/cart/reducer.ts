import { AnyAction } from 'redux'
import { clone } from 'lodash'
import produce from 'immer'
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SHOPIFY_CHECK_OUT,

  IState,
} from './index'


const initialState: IState = {
  products: [],
}

const reducer = (
  state: IState = initialState,
  { payload, type }: AnyAction,
): IState => {
  switch (type) {
    case ADD_PRODUCT_TO_CART: {
      return produce(state, draftState => {
        const product = clone(payload.product)

        if (!product.hasFixedPrice) {
          product.userSuggestedPrice = payload.suggestedPrice
        }

        draftState.products = draftState.products.concat([product])
      })
    }

    case REMOVE_PRODUCT_FROM_CART: {
      return produce(state, draftState => {
        draftState.products = draftState.products.filter(product =>
          product.id !== payload
        )
      })
    }

    case SHOPIFY_CHECK_OUT: {
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
