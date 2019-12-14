import { AnyAction } from 'redux'
import produce from 'immer'
import { titleCase } from 'voca'
import { getProduct } from '../functions'
import {
  SET_LENS_COLOR,
  SET_LENS_TREATMENT_TYPE,
  SET_PRESCRIPTION_FILE,
  SET_PRESCRIPTION_TYPE,
  SET_PRODUCT,
  SET_SWATCH_TYPE,
  SET_TINT_TYPE,
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

    case SET_PRESCRIPTION_FILE: {
      return produce(state, draftState => {
        if (!draftState.product) return
        draftState.product.prescriptionFile = payload
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
        draftState.product.swatchTypeText = titleCase(payload.replace(/-/g, '. ')) + '.'
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
