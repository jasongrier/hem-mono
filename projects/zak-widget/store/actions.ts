import {
  LensColor,
  LensTreatmentType,
  PrescriptionType,
  SwatchType,
  TintType,

  IProduct,

  LOAD_PRODUCT,
  SET_LENS_COLOR,
  SET_LENS_TREATMENT_TYPE,
  SET_PRESCRIPTION_TYPE,
  SET_SWATCH_TYPE,
  SET_TINT_TYPE,
  TOGGLE_HIGH_INDEX_ADD_ON,

  ILoadProduct,
  ISetLensColor,
  ISetLensTreatmentType,
  ISetPrescriptionType,
  ISetSwatchType,
  ISetTintType,
  IToggleHighIndexAddOn,
} from './types'

const loadProduct = (product: IProduct): ILoadProduct => ({
  type: LOAD_PRODUCT,
  payload: product,
})

const setLensColor = (lensColor: LensColor): ISetLensColor => ({
  type: SET_LENS_COLOR,
  payload: lensColor,
})

const setLensTreatmentType = (lensTreatmentType: LensTreatmentType): ISetLensTreatmentType => ({
  type: SET_LENS_TREATMENT_TYPE,
  payload: lensTreatmentType,
})

const setPrescriptionType = (prescriptionType: PrescriptionType): ISetPrescriptionType => ({
  type: SET_PRESCRIPTION_TYPE,
  payload: prescriptionType,
})

const setSwatchType = (swatchType: SwatchType): ISetSwatchType => ({
  type: SET_SWATCH_TYPE,
  payload: swatchType,
})

const setTintType = (tintType: TintType): ISetTintType => ({
  type: SET_TINT_TYPE,
  payload: tintType,
})

const toggleHighIndexAddOn = (): IToggleHighIndexAddOn => ({
  type: TOGGLE_HIGH_INDEX_ADD_ON,
  payload: null,
})

export {
  loadProduct,
  setLensColor,
  setLensTreatmentType,
  setPrescriptionType,
  setSwatchType,
  setTintType,
  toggleHighIndexAddOn,
}
