import { AnyAction } from 'redux'
// TODO: Decouple the modules
import { IContentItem } from '../content'

export interface IState {
  products: IContentItem[]
}

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'

export interface IAddProductToCart extends AnyAction {
  type: typeof ADD_PRODUCT_TO_CART
  payload: { product: IContentItem, suggestedPrice?: number }
}

export interface IRemoveProductFromCart extends AnyAction {
  type: typeof REMOVE_PRODUCT_FROM_CART
  payload: string
}

export type Action = IAddProductToCart | IRemoveProductFromCart

export { addProductToCart, removeProductFromCart } from './actions'
export { reducer as cartReducer } from './reducer'
export { CartPopup } from './components'
