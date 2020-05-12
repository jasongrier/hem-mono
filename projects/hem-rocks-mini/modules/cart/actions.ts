import {
  ADD_PRODUCT_TO_CART,
  CLEAR_CART,
  REMOVE_PRODUCT_FROM_CART,

  Action,
} from './index'
import { IContentItem } from '../content'

const addProductToCart = (product: IContentItem, price?: number): Action => ({
  type: ADD_PRODUCT_TO_CART,
  payload: { product, price },
})

const clearCart = (): Action => ({
  type: CLEAR_CART,
  payload: null,
})

const removeProductFromCart = (productId: string): Action => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: productId,
})

export {
  addProductToCart,
  clearCart,
  removeProductFromCart,
}
