import {
  LensColor,
  LensTreatmentType,
  PrescriptionType,
  SwatchType,
  TintType,

  IProduct,

  REQUEST_PRODUCT,
  SET_LENS_COLOR,
  SET_LENS_TREATMENT_TYPE,
  SET_PRESCRIPTION_TYPE,
  SET_PRODUCT,
  SET_SWATCH_TYPE,
  SET_TINT_TYPE,
  TOGGLE_HIGH_INDEX_ADD_ON,

  IRequestProduct,
  ISetLensColor,
  ISetLensTreatmentType,
  ISetPrescriptionType,
  ISetSwatchType,
  ISetTintType,
  IToggleHighIndexAddOn,
  ISetProduct,
} from './types'

const requestProduct = (productHandle: string): IRequestProduct => ({
  payload: productHandle,
  type: REQUEST_PRODUCT,
})

const setLensColor = (lensColor: LensColor): ISetLensColor => ({
  payload: lensColor,
  type: SET_LENS_COLOR,
})

const setLensTreatmentType = (lensTreatmentType: LensTreatmentType): ISetLensTreatmentType => ({
  payload: lensTreatmentType,
  type: SET_LENS_TREATMENT_TYPE,
})

const setPrescriptionType = (prescriptionType: PrescriptionType): ISetPrescriptionType => ({
  payload: prescriptionType,
  type: SET_PRESCRIPTION_TYPE,
})

const setProduct = (product: IProduct): ISetProduct => ({
  payload: product,
  type: SET_PRODUCT,
})

const setSwatchType = (swatchType: SwatchType): ISetSwatchType => ({
  payload: swatchType,
  type: SET_SWATCH_TYPE,
})

const setTintType = (tintType: TintType): ISetTintType => ({
  payload: tintType,
  type: SET_TINT_TYPE,
})

const toggleHighIndexAddOn = (): IToggleHighIndexAddOn => ({
  payload: null,
  type: TOGGLE_HIGH_INDEX_ADD_ON,
})

export {
  requestProduct,
  setLensColor,
  setLensTreatmentType,
  setPrescriptionType,
  setProduct,
  setSwatchType,
  setTintType,
  toggleHighIndexAddOn,
}
