import { AnyAction } from 'redux'
import produce from 'immer'
import { getPricing } from '../functions'
import {
  LOAD_PRODUCT,
  SET_LENS_COLOR,
  SET_LENS_TREATMENT_TYPE,
  SET_PRESCRIPTION_TYPE,
  SET_SWATCH_TYPE,
  SET_TINT_TYPE,
  TOGGLE_HIGH_INDEX_ADD_ON,

  IState,
} from './types'

const tempProduct = {
  basePrice: 1,
  description: `
    <p>Unisex. Classic proportions. Constructed with high quality acetate and adjusted for a symmetrical fit. Lightweight Polycarbonate lens, AR coating to block glare, and 100% UV-A and UV-B protection. Paired with Zak. case, cleaning cloth and spray.</p>
  `,
  hasHighIndexAddOn: false,
  id: 'temp-product',
  imageUrl: '/static/assets/images/fpo-pdp-main.jpg',
  lensColor: 'lens-gray' as 'lens-gray',
  lensTreatmentType: 'standard' as 'standard',
  prescriptionType: 'single-vision' as 'single-vision',
  secondaryTitle: 'foo',
  swatchType: 'eyeglass-black' as 'eyeglass-black',
  title: 'The Round Eyeglass',
  tintType: 'none' as 'none',
}

const initialState: IState = {
  // product: null,
  product: tempProduct,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction, // TODO: Why doesn't Saga like union types?
): IState => {
  switch (type) {
    case LOAD_PRODUCT: {
      return state
    }

    case SET_LENS_COLOR: {
      return produce(state, draftState => {
        draftState.product.lensColor = payload
      })
    }

    case SET_LENS_TREATMENT_TYPE: {
      return produce(state, draftState => {
        draftState.product.lensTreatmentType = payload
      })
    }

    case SET_PRESCRIPTION_TYPE: {
      return produce(state, draftState => {
        draftState.product.prescriptionType = payload
      })
    }

    case SET_SWATCH_TYPE: {
      return produce(state, draftState => {
        draftState.product.swatchType = payload
      })
    }

    case SET_TINT_TYPE: {
      return produce(state, draftState => {
        draftState.product.tintType = payload
      })
    }

    case TOGGLE_HIGH_INDEX_ADD_ON: {
      return produce(state, draftState => {
        draftState.product.hasHighIndexAddOn = !draftState.product.hasHighIndexAddOn
      })
    }

    default: {
      return state
    }
  }
}

export {
  initialState,
  reducer,
}
