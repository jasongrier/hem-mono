import { AnyAction } from 'redux'
import produce from 'immer'
import {
  SET_SHADE_OPTION,
  SET_SKIN_TONE_OPTION,
  SET_STEP,
  SET_UNDERTONE_OPTION,
  SET_WIDGET_DATA,

  IState,
} from './'

// const initialState: IState = {
//   completedSteps: 1,
//   currentStep: 1,
//   isPopup: true,
//   shadeOption: null,
//   skinToneOption: null,
//   widgetData: null,
// }

const initialState: IState = {
  completedSteps: 4,
  currentStep: 4,
  isPopup: true,
  shadeOption: null,
  skinToneOption: null,
  undertoneOption: null,
  widgetData: null,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case (SET_SHADE_OPTION): {
      return produce(state, draftState => {
        draftState.shadeOption = payload
      })
    }

    case (SET_SKIN_TONE_OPTION): {
      return produce(state, draftState => {
        draftState.skinToneOption = payload
      })
    }

    case (SET_STEP): {
      return produce(state, draftState => {
        if (draftState.completedSteps < payload) {
          draftState.completedSteps = payload
        }
        draftState.currentStep = payload
      })
    }

    case (SET_UNDERTONE_OPTION): {
      return produce(state, draftState => {
        draftState.undertoneOption = payload
      })
    }

    case (SET_WIDGET_DATA): {
      return state
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
