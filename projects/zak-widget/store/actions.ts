import { AnyAction } from 'redux'
import {
  LOAD_PRODUCT,

  IProduct,
} from './types'

const loadProduct = (product: IProduct): AnyAction => ({
  type: LOAD_PRODUCT,
  payload: product,
})

export {
  loadProduct,
}
