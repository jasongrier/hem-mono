import { AnyAction } from 'redux'
// TODO: Decouple the modules
import { IContentItem } from '../content'

export interface IState {
  products: IContentItem[]
  redirecting: boolean
}

export const SHOPIFY_ADD_TO_CART = 'SHOPIFY_ADD_TO_CART'

export interface IShopifyAddToCart extends AnyAction {
  type: typeof SHOPIFY_ADD_TO_CART
  payload: { productHandle: string, price: number }
}

export type Action = IShopifyAddToCart

export { shopifyAddToCart } from './actions'
export { CartPopup } from './components'
export { reducer as cartReducer } from './reducer'
export { shopifyCheckOutSaga } from './sagas'
