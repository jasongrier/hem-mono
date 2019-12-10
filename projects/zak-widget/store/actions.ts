import {
  LensColor,
  SwatchType,

  IProduct,

  LOAD_PRODUCT,
  SET_LENS_COLOR,
  SET_SWATCH_TYPE,

  ILoadProduct,
  ISetSwatch,
  ISetLensColor,
} from './types'

const loadProduct = (product: IProduct): ILoadProduct => ({
  type: LOAD_PRODUCT,
  payload: product,
})

const setSwatchType = (swatchType: SwatchType): ISetSwatch => ({
  type: SET_SWATCH_TYPE,
  payload: swatchType,
})

const setLensColor = (lensColor: LensColor): ISetLensColor => ({
  type: SET_LENS_COLOR,
  payload: lensColor,
})

export {
  loadProduct,
  setLensColor,
  setSwatchType,
}
