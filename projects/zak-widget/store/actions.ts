import {
  LensColorSwatch,
  ThemeSwatch,

  SET_LENS_COLOR_SWATCH,
  SET_LENS_TREATMENT,
  SET_PRESCRIPTION_FILE,
  SET_PRESCRIPTION,
  SET_THEME_SWATCH,
  SET_TINT,
  TOGGLE_HIGH_INDEX_ADD_ON,

  ISetLensColorSwatch,
  ISetLensTreatment,
  ISetPrescription,
  ISetPrescriptionFile,
  ISetThemeSwatch,
  ISetTint,
  IToggleHighIndexAddOn,
} from './types'

const setLensColorSwatch = (lensColor: LensColorSwatch): ISetLensColorSwatch => ({
  payload: lensColor,
  type: SET_LENS_COLOR_SWATCH,
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

const setThemeSwatch = (theme: ThemeSwatch): ISetThemeSwatch => ({
  payload: theme,
  type: SET_THEME_SWATCH,
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
  setLensColorSwatch,
  setLensTreatment,
  setPrescription,
  setPrescriptionFile,
  setThemeSwatch,
  setTint,
  toggleHighIndexAddOn,
}
