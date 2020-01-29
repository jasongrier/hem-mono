import {
  LensColorSwatch,

  INIT_PRODUCT,
  SET_LENS_COLOR,
  SET_LENS_TREATMENT,
  SET_PRESCRIPTION_FILE,
  SET_PRESCRIPTION,
  SET_THEME,
  SET_TINT,
  TOGGLE_HIGH_INDEX_ADD_ON,

  IInitProduct,
  ISetLensColor,
  ISetLensTreatment,
  ISetPrescription,
  ISetPrescriptionFile,
  ISetTheme,
  ISetTint,
  IToggleHighIndexAddOn,
} from './types'

const initProduct = (): IInitProduct => ({
  payload: null,
  type: INIT_PRODUCT,
})

const setLensColor = (lensColor: string): ISetLensColor => ({
  payload: lensColor,
  type: SET_LENS_COLOR,
})

const setLensTreatment = (lensTreatmentName: string): ISetLensTreatment => ({
  payload: lensTreatmentName,
  type: SET_LENS_TREATMENT,
})

const setPrescription = (prescriptionName: string): ISetPrescription => ({
  payload: prescriptionName,
  type: SET_PRESCRIPTION,
})

const setPrescriptionFile = (prescriptionFile: File): ISetPrescriptionFile => ({
  payload: prescriptionFile,
  type: SET_PRESCRIPTION_FILE,
})

const setTheme = (theme: string): ISetTheme => ({
  payload: theme,
  type: SET_THEME,
})

const setTint = (tintName: string): ISetTint => ({
  payload: tintName,
  type: SET_TINT,
})

const toggleHighIndexAddOn = (): IToggleHighIndexAddOn => ({
  payload: null,
  type: TOGGLE_HIGH_INDEX_ADD_ON,
})

export {
  initProduct,
  setLensColor,
  setLensTreatment,
  setPrescription,
  setPrescriptionFile,
  setTheme,
  setTint,
  toggleHighIndexAddOn,
}
