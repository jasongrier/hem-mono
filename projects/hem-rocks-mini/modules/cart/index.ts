import { AnyAction } from 'redux'
// TODO: Decouple the modules
import { IContentItem } from '../content'

export interface IState {
  products: IContentItem[]
  redirecting: boolean
}

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'

export interface IShopifyAddToCart extends AnyAction {
  type: typeof SHOPIFY_ADD_TO_CART
  payload: { productHandle: string, price: number }
}

export interface IRemoveProductFromCart extends AnyAction {
  type: typeof REMOVE_PRODUCT_FROM_CART
  payload: string
}

export type Action = IAddProductToCart | IRemoveProductFromCart

export { addProductToCart, removeProductFromCart } from './actions'
export { CartPopup, PayPalCartUpload, ThankYouPopup } from './components'
export { reducer as cartReducer } from './reducer'
