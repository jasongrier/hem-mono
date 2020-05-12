import { AnyAction } from 'redux'
// TODO: Decouple the modules
import { IContentItem } from '../content'

export interface IState {
  products: IContentItem[]
  redirecting: boolean
}

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'

export interface IAddProductToCart extends AnyAction {
  type: typeof ADD_PRODUCT_TO_CART
  payload: { product: IContentItem, price: number }
}

export interface IClearCart extends AnyAction {
  type: typeof CLEAR_CART
  payload: null
}

export interface IRemoveProductFromCart extends AnyAction {
  type: typeof REMOVE_PRODUCT_FROM_CART
  payload: string
}

export type Action = IAddProductToCart | IClearCart | IRemoveProductFromCart

export { addProductToCart, clearCart, removeProductFromCart } from './actions'
export { CartPopup, PayPalCartUpload, ThankYouPopup } from './components'
export { reducer as cartReducer } from './reducer'
