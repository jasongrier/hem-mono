import {
  ADD_PRODUCT_TO_CART,
  CLEAR_CART,
  REMOVE_PRODUCT_FROM_CART,
  REQUEST_SALE,
  SET_CART_PRODUCTS,
  SET_CURRENT_SALE,
  SUBMIT_SALE,

  Action,

  IProduct,
  ISale,
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

const requestSale = (saleId: string): Action => ({
  type: REQUEST_SALE,
  payload: saleId,
})

const setCartProducts = (products: IProduct[]): Action => ({
  type: SET_CART_PRODUCTS,
  payload: products,
})

const setCurrentSale = (sale: ISale): Action => ({
  type: SET_CURRENT_SALE,
  payload: sale,
})

const submitSale = (saleId: string): Action => ({
  type: SUBMIT_SALE,
  payload: saleId,
})

export {
  addProductToCart,
  clearCart,
  removeProductFromCart,
  requestSale,
  setCartProducts,
  setCurrentSale,
  submitSale,
}
