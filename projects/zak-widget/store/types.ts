import { AnyAction } from 'redux'

export interface IProduct {
  description: string
  hasHighIndexAddOn: boolean
  id: string
  imageUrl: string
  secondaryTitle: string
  title: string
}

export interface IState {
  product: IProduct
}

export const LOAD_PRODUCT = 'LOAD_PRODUCT'

export interface ILoadProduct extends AnyAction {
  type: typeof LOAD_PRODUCT
  payload: IProduct
}

export type Action = ILoadProduct
