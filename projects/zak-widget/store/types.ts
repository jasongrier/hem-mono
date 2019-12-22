import { AnyAction } from 'redux'

export type LensColorSwatch =
    'lens-gray'
  | 'lens-green'
  | 'lens-brown'

export interface IProduct {
  basePrice: number
  defaultImageUrl: string
  description: string
  theme: string
  hasHighIndexAddOn: boolean
  id: string
  lensColorSwatch: LensColorSwatch
  lensTreatment: string
  optionNames: string[]
  prescription: string
  prescriptionFile: File | null
  tint: string
  title: string
}

export interface IState {
  product: IProduct | null
}

export const SET_LENS_COLOR_SWATCH = 'SET_LENS_COLOR_SWATCH'
export const SET_LENS_TREATMENT = 'SET_LENS_TREATMENT'
export const SET_PRESCRIPTION_FILE = 'SET_PRESCRIPTION_FILE'
export const SET_PRESCRIPTION = 'SET_PRESCRIPTION'
export const SET_THEME = 'SET_THEME'
export const SET_TINT = 'SET_TINT'
export const TOGGLE_HIGH_INDEX_ADD_ON = 'TOGGLE_HIGH_INDEX_ADD_ON'

export interface ISetLensColorSwatch extends AnyAction {
  type: typeof SET_LENS_COLOR_SWATCH
  payload: LensColorSwatch
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
  payload: string
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
  ISetLensColorSwatch
  | ISetLensTreatment
  | ISetPrescriptionFile
  | ISetPrescription
  | ISetTheme
  | ISetTint
  | IToggleHighIndexAddOn
