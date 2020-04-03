export interface IProduct {
  id: string
  name: string
  tags: string[]
  description: string
  hasFixedPrice: number | null
  fixedPrice: number | null
  flexPriceMinimum: number | null
}

export interface IState {
  products: IProduct[]
}

export { reducer as productsReducer } from './reducer'
export { BuyPopUp, ProductTileA } from './components'
