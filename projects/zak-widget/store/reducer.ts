import { AnyAction } from 'redux'
import produce from 'immer'
import { getProduct, getCurrentVariant } from '../functions'
import { applyProductRestrictions } from '../functions/rules'
import {
  INIT_PRODUCT,
  SET_LENS_COLOR_SWATCH,
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
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case INIT_PRODUCT: {
      return produce(state, draftState => {
        if (!draftState.product) return state

        const currentVariant = getCurrentVariant(draftState.product)
        if (!currentVariant) return state

        draftState.product.id = currentVariant.id
      })
    }

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

    case SET_THEME: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.theme = payload
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
