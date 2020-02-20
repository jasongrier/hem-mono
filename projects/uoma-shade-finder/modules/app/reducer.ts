import { AnyAction } from 'redux'
import produce from 'immer'
import {
  SET_NEEDS_SUBQUIZ,
  SET_SHADE_OPTION,
  SET_SKIN_TONE_OPTION,
  SET_STEP,
  SET_SUBQUIZ_TONE,
  SET_SUBQUIZ_VEINS,
  SET_UNDERTONE_OPTION,
  SET_WIDGET_DATA,

  IState,
  RESET_QUIZ,
} from './'

const initialState: IState = {
  completedSteps: 1,
  currentStep: 1,
  isPopup: true,
  needsSubquiz: false,
  shadeOption: null,
  skinToneOption: null,
  subQuizTone: null,
  subQuizVeins: null,
  undertoneOption: null,
  widgetData: null,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case (RESET_QUIZ): {
      return initialState
    }

    case (SET_NEEDS_SUBQUIZ): {
      return produce(state, draftState => {
        draftState.needsSubquiz = payload
      })
    }

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

    case (SET_SUBQUIZ_TONE): {
      return produce(state, draftState => {
        draftState.subQuizTone = payload
      })
    }

    case (SET_SUBQUIZ_VEINS): {
      return produce(state, draftState => {
        draftState.subQuizVeins = payload
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
