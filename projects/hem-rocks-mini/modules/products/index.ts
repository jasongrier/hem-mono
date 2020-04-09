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
  title: string
  videos: string[]
}

export interface IState {
  products: IProduct[]
}

export { reducer as productsReducer } from './reducer'
export { BuyPopUp, ProductTile } from './components'
