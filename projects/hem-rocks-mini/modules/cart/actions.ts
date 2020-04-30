import { IContentItem } from '../content'
import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SHOPIFY_CHECK_OUT,

  Action,
} from './index'

const addProductToCart = (product: IContentItem, suggestedPrice?: number): Action => ({
  type: ADD_PRODUCT_TO_CART,
  payload: { product, suggestedPrice },
})

const removeProductFromCart = (productId: string): Action => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: productId,
})

const shopifyCheckOut = (productHandles: string[], prices: number[]): Action => ({
  type: SHOPIFY_CHECK_OUT,
  payload: { productHandles, prices },
})

export {
  addProductToCart,
  removeProductFromCart,
  shopifyCheckOut,
}
