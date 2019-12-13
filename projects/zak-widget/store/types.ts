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

export type LensTreatmentType =
  'blue-ar-coating'
  | 'standard'
  | 'traditional-lens'

export type PrescriptionType =
    'single-vision'
  | 'progressive'
  | 'no-prescription'

export type TintType =
  'blue'
  | 'gradient-blue'
  | 'gradient-brown'
  | 'gradient-dark-gray'
  | 'gradient-green'
  | 'gradient-light-gray'
  | 'gradient-rose'
  | 'lime'
  | 'mirror-black'
  | 'mirror-blue'
  | 'mirror-gold'
  | 'mirror-lavender'
  | 'mirror-orange'
  | 'mirror-silver'
  | 'none'
  | 'orange'
  | 'purple'
  | 'rose'
  | 'yellow'

export interface IPrescription {
  text: string
  price: number
  value: PrescriptionType
}

export interface IProduct {
  basePrice: number
  description: string
  hasHighIndexAddOn: boolean
  id: string
  lensColor: LensColor
  lensTreatmentType: LensTreatmentType
  prescriptionType: PrescriptionType
  secondaryTitle: string
  swatchType: SwatchType
  swatchTypeText: string
  tintType: TintType
  title: string
}

export interface IState {
  product: IProduct | null
}

export const REQUEST_PRODUCT = 'REQUEST_PRODUCT'
export const SET_LENS_COLOR = 'SET_LENS_COLOR'
export const SET_LENS_TREATMENT_TYPE = 'SET_LENS_TREATMENT_TYPE'
export const SET_PRESCRIPTION_TYPE = 'SET_PRESCRIPTION_TYPE'
export const SET_PRODUCT = 'SET_PRODUCT'
export const SET_SWATCH_TYPE = 'SET_SWATCH_TYPE'
export const SET_TINT_TYPE = 'SET_TINT_TYPE'
export const TOGGLE_HIGH_INDEX_ADD_ON = 'TOGGLE_HIGH_INDEX_ADD_ON'

export interface IRequestProduct extends AnyAction {
  type: typeof REQUEST_PRODUCT
  payload: string
}

export interface ISetLensColor extends AnyAction {
  type: typeof SET_LENS_COLOR
  payload: LensColor
}

export interface ISetLensTreatmentType extends AnyAction {
  type: typeof SET_LENS_TREATMENT_TYPE
  payload: LensTreatmentType
}

export interface ISetPrescriptionType extends AnyAction {
  type: typeof SET_PRESCRIPTION_TYPE
  payload: PrescriptionType
}

export interface ISetProduct extends AnyAction {
  type: typeof SET_PRODUCT
  payload: IProduct
}

export interface ISetSwatchType extends AnyAction {
  type: typeof SET_SWATCH_TYPE
  payload: SwatchType
}

export interface ISetTintType extends AnyAction {
  type: typeof SET_TINT_TYPE
  payload: TintType
}

export interface IToggleHighIndexAddOn extends AnyAction {
  type: typeof TOGGLE_HIGH_INDEX_ADD_ON
  payload: null
}

export type Action =
    IRequestProduct
  | ISetLensColor
  | ISetPrescriptionType
  | ISetProduct
  | ISetSwatchType
  | ISetTintType
  | IToggleHighIndexAddOn
