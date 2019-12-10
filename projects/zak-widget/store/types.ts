import { AnyAction } from 'redux'

export type SwatchType =
    'eyeglass-clear'
  | 'eyeglass-black'
  | 'eyeglass-tortoise'
  | 'lens-brown'
  | 'lens-gray'
  | 'lens-green'
  | 'sunglass-black'
  | 'sunglass-clear'
  | 'sunglass-tortoise'

export type LensColor =
    'lens-brown'
  | 'lens-gray'
  | 'lens-green'

export interface IProduct {
  description: string
  hasHighIndexAddOn: boolean
  id: string
  imageUrl: string
  lensColor: LensColor
  secondaryTitle: string
  swatchType: SwatchType
  title: string
}

export interface IState {
  product: IProduct
}

export const LOAD_PRODUCT = 'LOAD_PRODUCT'
export const SET_SWATCH_TYPE = 'SET_SWATCH_TYPE'
export const SET_LENS_COLOR = 'SET_LENS_COLOR'

export interface ILoadProduct extends AnyAction {
  type: typeof LOAD_PRODUCT
  payload: IProduct
}

export interface ISetSwatch extends AnyAction {
  type: typeof SET_SWATCH_TYPE
  payload: SwatchType
}

export interface ISetLensColor extends AnyAction {
  type: typeof SET_LENS_COLOR
  payload: LensColor
}

export type Action =
    ILoadProduct
  | ISetLensColor
  | ISetSwatch
