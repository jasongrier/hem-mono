import { AnyAction } from 'redux'
import produce from 'immer'
import { SWATCH_TYPES } from '../config'
import {
  SET_PRODUCT,
  SET_LENS_COLOR,
  SET_LENS_TREATMENT_TYPE,
  SET_PRESCRIPTION_TYPE,
  SET_SWATCH_TYPE,
  SET_TINT_TYPE,
  TOGGLE_HIGH_INDEX_ADD_ON,

  IState,
} from './types'

const initialState: IState = {
  product: null,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SET_PRODUCT: {
      return produce(state, draftState => {
        draftState.product = payload
      })
    }

    case SET_LENS_COLOR: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.lensColor = payload
      })
    }

    case SET_LENS_TREATMENT_TYPE: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.lensTreatmentType = payload
      })
    }

    case SET_PRESCRIPTION_TYPE: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.prescriptionType = payload
      })
    }

    case SET_SWATCH_TYPE: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.swatchType = payload
        draftState.product.swatchTypeText = SWATCH_TYPES.find(type => type.id === payload).text
      })
    }

    case SET_TINT_TYPE: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.tintType = payload
      })
    }

    case TOGGLE_HIGH_INDEX_ADD_ON: {
      return produce(state, draftState => {
        if (!draftState.product) return
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
