import { AnyAction } from 'redux'

export interface IProduct {
  finalPrice: string
  name: string
  slug: string
  type: string
}

export interface IState {
  products: IProduct[]
  redirecting: boolean
}

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS'

export interface IAddProductToCart extends AnyAction {
  type: typeof ADD_PRODUCT_TO_CART
  payload: IProduct
}

export interface IClearCart extends AnyAction {
  type: typeof CLEAR_CART
  payload: null
}

export interface IRemoveProductFromCart extends AnyAction {
  type: typeof REMOVE_PRODUCT_FROM_CART
  payload: string
}

export interface ISetCartProducts extends AnyAction {
  type: typeof SET_CART_PRODUCTS
  payload: IProduct[]
}

export type Action =
  IAddProductToCart
  | IClearCart
  | IRemoveProductFromCart
  | ISetCartProducts

export { addProductToCart, clearCart, removeProductFromCart, setCartProducts } from './actions'
export { CartPopup, PayPalCartUpload, ThankYouPopup } from './components'
export { reducer as cartReducer } from './reducer'
export { addProductToCartSaga, clearCartSaga, removeProductFromCartSaga } from './sagas'
