import { AnyAction } from 'redux'

export interface IProductImage {
  alt: string
  src: string
}

export interface IProduct {
  blurb: string
  description: string
  featureList: string[]
  fixedPrice: number | null
  flexPriceMinimum: number | null
  hasFixedPrice: boolean
  id: string
  images: IProductImage[]
  tags: string[]
  name: string
  soundCloudTrackId: string
  slug: string
  type: string
  userSuggestedPrice: number
  videos: string[]
}

export interface IState {
  cartProducts: IProduct[]
  currentProduct: IProduct | null
  products: IProduct[]
}

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT'

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
