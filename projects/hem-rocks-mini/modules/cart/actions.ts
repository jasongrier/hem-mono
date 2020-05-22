import {
  ADD_PRODUCT_TO_CART,
  CLEAR_CART,
  REMOVE_PRODUCT_FROM_CART,
  SET_CART_PRODUCTS,

  Action,

  IProduct,
} from './index'

const addProductToCart = (product: IProduct): Action => ({
  type: ADD_PRODUCT_TO_CART,
  payload: product,
})

const clearCart = (): Action => ({
  type: CLEAR_CART,
  payload: null,
})

const removeProductFromCart = (productSlug: string): Action => ({
  type: REMOVE_PRODUCT_FROM_CART,
  payload: productSlug,
})

const setCartProducts = (products: IProduct[]): Action => ({
  type: SET_CART_PRODUCTS,
  payload: products,
})

export {
  addProductToCart,
  clearCart,
  removeProductFromCart,
  setCartProducts,
}
