import { AnyAction } from 'redux'
import produce from 'immer'
import { getProduct, getProductOptionByName, getProductWithRestrictions } from '../functions'
import {
  SET_LENS_COLOR,
  SET_LENS_TREATMENT,
  SET_PRESCRIPTION_FILE,
  SET_PRESCRIPTION,
  SET_THEME,
  SET_TINT,
  TOGGLE_HIGH_INDEX_ADD_ON,

  IState,
} from './types'

const initialState: IState = {
  product: getProduct(),
  theme: 'eyeglass-black',
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SET_LENS_COLOR: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.lensColor = payload
        draftState.product = getProductWithRestrictions(draftState)
      })
    }

    case SET_LENS_TREATMENT: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.lensTreatment = getProductOptionByName(payload)
        draftState.product = getProductWithRestrictions(draftState)
      })
    }

    case SET_PRESCRIPTION_FILE: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.prescriptionFile = payload
        draftState.product = getProductWithRestrictions(draftState)
      })
    }

    case SET_PRESCRIPTION: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.prescription = getProductOptionByName(payload)
        draftState.product = getProductWithRestrictions(draftState)
      })
    }

    case SET_THEME: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.theme = payload
        draftState.product = getProductWithRestrictions(draftState)
      })
    }

    case SET_TINT: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.tint = getProductOptionByName(payload)
        draftState.product = getProductWithRestrictions(draftState)
      })
    }

    case TOGGLE_HIGH_INDEX_ADD_ON: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.hasHighIndexAddOn = !draftState.product.hasHighIndexAddOn
        draftState.product = getProductWithRestrictions(draftState)
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
