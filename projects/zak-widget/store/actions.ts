import {
  LensColor,
  Theme,

  SET_LENS_COLOR,
  SET_LENS_TREATMENT,
  SET_PRESCRIPTION_FILE,
  SET_PRESCRIPTION,
  SET_THEME,
  SET_TINT,
  TOGGLE_HIGH_INDEX_ADD_ON,

  ISetLensColor,
  ISetLensTreatment,
  ISetPrescription,
  ISetPrescriptionFile,
  ISetTheme,
  ISetTint,
  IToggleHighIndexAddOn,
} from './types'

const setLensColor = (lensColor: LensColor): ISetLensColor => ({
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

const setTheme = (theme: Theme): ISetTheme => ({
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
  setLensColor,
  setLensTreatment,
  setPrescription,
  setPrescriptionFile,
  setTheme,
  setTint,
  toggleHighIndexAddOn,
}
