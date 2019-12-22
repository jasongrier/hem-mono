import { AnyAction } from 'redux'
import produce from 'immer'
import { getProduct, applyProductRestrictions } from '../functions'
import {
  SET_LENS_COLOR_SWATCH,
  SET_LENS_TREATMENT,
  SET_PRESCRIPTION_FILE,
  SET_PRESCRIPTION,
  SET_THEME_SWATCH,
  SET_TINT,
  TOGGLE_HIGH_INDEX_ADD_ON,

  IState,
} from './types'

const initialState: IState = {
  product: getProduct(),
  themeSwatch: 'eyeglass-black',
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SET_LENS_COLOR_SWATCH: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.lensColorSwatch = payload
        applyProductRestrictions(draftState)
      })
    }

    case SET_LENS_TREATMENT: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.lensTreatment = payload
        applyProductRestrictions(draftState)
      })
    }

    case SET_PRESCRIPTION_FILE: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.prescriptionFile = payload
        applyProductRestrictions(draftState)
      })
    }

    case SET_PRESCRIPTION: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.prescription = payload
        applyProductRestrictions(draftState)
      })
    }

    case SET_THEME_SWATCH: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.themeSwatch = payload
        applyProductRestrictions(draftState)
      })
    }

    case SET_TINT: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.tint = payload
        applyProductRestrictions(draftState)
      })
    }

    case TOGGLE_HIGH_INDEX_ADD_ON: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.hasHighIndexAddOn = !draftState.product.hasHighIndexAddOn
        applyProductRestrictions(draftState)
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
