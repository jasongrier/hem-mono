export interface IProduct {
  id: string
  name: string
  description: string
  hasFixedPrice: number | null
  fixedPrice: number | null
  flexPriceMinimum: number | null
}

export { reducer as appReducer } from './reducer'
export { BuyPopUp, ProductTileA } from './components'
