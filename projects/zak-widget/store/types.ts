import { AnyAction } from 'redux'

export type Theme =
  'eyeglass-black'
   | 'eyeglass-tortoise'
   | 'sunglass-black'
   | 'sunglass-clear'
   | 'sunglass-tortoise'
   | 'eyeglass-clear'

export type LensColor =
    'lens-gray'
  | 'lens-green'
  | 'lens-brown'

export interface IProductOption {
  name: string
  price: number
}

export interface IProduct {
  basePrice: number
  defaultImageUrl: string
  description: string
  frame: IProductOption
  hasHighIndexAddOn: boolean
  id: string
  lensColor: LensColor
  lensTreatment: IProductOption
  optionNames: string[]
  prescription: IProductOption
  prescriptionFile: File | null
  tint: IProductOption
  title: string
}

export interface IState {
  product: IProduct | null
  theme: Theme
}

export const SET_LENS_COLOR = 'SET_LENS_COLOR'
export const SET_LENS_TREATMENT = 'SET_LENS_TREATMENT'
export const SET_PRESCRIPTION_FILE = 'SET_PRESCRIPTION_FILE'
export const SET_PRESCRIPTION = 'SET_PRESCRIPTION'
export const SET_THEME = 'SET_THEME'
export const SET_TINT = 'SET_TINT'
export const TOGGLE_HIGH_INDEX_ADD_ON = 'TOGGLE_HIGH_INDEX_ADD_ON'

export interface ISetLensColor extends AnyAction {
  type: typeof SET_LENS_COLOR
  payload: LensColor
}

export interface ISetLensTreatment extends AnyAction {
  type: typeof SET_LENS_TREATMENT
  payload: string
}

export interface ISetPrescriptionFile extends AnyAction {
  type: typeof SET_PRESCRIPTION_FILE
  payload: File
}

export interface ISetPrescription extends AnyAction {
  type: typeof SET_PRESCRIPTION
  payload: string
}

export interface ISetTheme extends AnyAction {
  type: typeof SET_THEME
  payload: Theme
}

export interface ISetTint extends AnyAction {
  type: typeof SET_TINT
  payload: string
}

export interface IToggleHighIndexAddOn extends AnyAction {
  type: typeof TOGGLE_HIGH_INDEX_ADD_ON
  payload: null
}

export type Action =
  ISetLensColor
  | ISetLensTreatment
  | ISetPrescriptionFile
  | ISetPrescription
  | ISetTheme
  | ISetTint
  | IToggleHighIndexAddOn
