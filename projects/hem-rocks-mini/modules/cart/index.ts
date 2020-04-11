import { AnyAction } from 'redux'
import { IContentItem } from '../content'

export interface IState {
  products: IContentItem[]
}

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'

export interface IAddProductToCart extends AnyAction {
  type: typeof ADD_PRODUCT_TO_CART
  payload: { product: IProduct, suggestedPrice?: number }
}

export interface IRemoveProductFromCart extends AnyAction {
  type: typeof REMOVE_PRODUCT_FROM_CART
  payload: string
}

export interface ISetCurrentProduct extends AnyAction {
  type: typeof SET_CURRENT_PRODUCT
  payload: IProduct
}

export type Action = IAddProductToCart | IRemoveProductFromCart | ISetCurrentProduct

export { addProductToCart, removeProductFromCart, setCurrentProduct } from './actions'
export { reducer as productsReducer } from './reducer'
export { BuyPopUp, CartPopup, ProductTile } from './components'
