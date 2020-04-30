import { AnyAction } from 'redux'
// TODO: Decouple the modules
import { IContentItem } from '../content'

export interface IState {
  products: IContentItem[]
}

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const SHOPIFY_CHECK_OUT = 'SHOPIFY_CHECK_OUT'

export interface IAddProductToCart extends AnyAction {
  type: typeof ADD_PRODUCT_TO_CART
  payload: { product: IContentItem, suggestedPrice?: number }
}

export interface IRemoveProductFromCart extends AnyAction {
  type: typeof REMOVE_PRODUCT_FROM_CART
  payload: string
}

export interface IShopifyCheckOut extends AnyAction {
  type: typeof SHOPIFY_CHECK_OUT
  payload: { productHandles: string[], prices: number[] }
}

export type Action = IAddProductToCart | IRemoveProductFromCart | IShopifyCheckOut

export { addProductToCart, removeProductFromCart, shopifyCheckOut } from './actions'
export { CartPopup } from './components'
export { reducer as cartReducer } from './reducer'
export { shopifyCheckOutSaga } from './sagas'
