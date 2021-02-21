import { AnyAction } from 'redux'

export interface IProduct {
  downloadFile: string
  finalPrice: string
  isDigitalProduct: boolean
  slug: string
  title: string
  type: string
}

export interface ISale {
  products: IProduct[]
  completed: boolean
  email: string
  id: string
  shippingAddress: string
}

export interface IState {
  currentSale: ISale | null
  products: IProduct[]
  redirecting: boolean
  saleRetrievalError: boolean
}

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const REQUEST_SALE = 'REQUEST_SALE'
export const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS'
export const SET_CURRENT_SALE = 'SET_CURRENT_SALE'
export const SET_SALE_RETRIEVAL_ERROR = 'SET_SALE_RETRIEVAL_ERROR'
export const SUBMIT_SALE = 'SUBMIT_SALE'

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

export interface IRequestSale extends AnyAction {
  type: typeof REQUEST_SALE
  payload: string
}

export interface ISetCartProducts extends AnyAction {
  type: typeof SET_CART_PRODUCTS
  payload: IProduct[]
}

export interface ISetCurrentSale extends AnyAction {
  type: typeof SET_CURRENT_SALE
  payload: ISale
}

export interface ISetSaleRetrievalError extends AnyAction {
  type: typeof SET_SALE_RETRIEVAL_ERROR
  payload: boolean
}

export interface ISubmitSale extends AnyAction {
  type: typeof SUBMIT_SALE
  payload: string
}

export type Action =
  IAddProductToCart
  | IClearCart
  | IRemoveProductFromCart
  | IRequestSale
  | ISetCartProducts
  | ISetCurrentSale
  | ISetSaleRetrievalError
  | ISubmitSale

export {
  addProductToCart,
  clearCart,
  removeProductFromCart,
  requestSale,
  setCurrentSale,
  setCartProducts,
  setSaleRetrievalError,
  submitSale
} from './actions'

export {
  CartFrame,
  CartPopup,
  PayPalCartUpload,
  ThankYouPopup
} from './components'

export { reducer as cartReducer } from './reducer'

export {
  addProductToCartSaga,
  clearCartSaga,
  removeProductFromCartSaga,
  requestSaleSaga,
  submitSaleSaga
} from './sagas'
