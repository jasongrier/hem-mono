import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SET_CURRENT_PRODUCT,

  Action,
  IProduct,
} from './index'

const addProductToCart = (product: IProduct, suggestedPrice?: number): Action => ({
  type: ADD_PRODUCT_TO_CART,
  payload: { product, suggestedPrice },
})

const removeProductFromCart = (productId: string): Action => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: productId,
})

const setCurrentProduct = (product: IProduct): Action => ({
  type: SET_CURRENT_PRODUCT,
  payload: product,
})

export {
  addProductToCart,
  removeProductFromCart,
  setCurrentProduct,
}
