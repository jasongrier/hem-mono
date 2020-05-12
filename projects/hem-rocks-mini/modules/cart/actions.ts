import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,

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

export {
  addProductToCart,
  removeProductFromCart,
}
