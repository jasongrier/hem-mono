import { AnyAction } from 'redux'

export interface IWidgetData {
  shadeOptions: any
  toneMatrix: any
  foundationJSON: any
  concealerJSON: any
  contourJSON: any
  resultsKey: any
  descriptions: any
}

export interface IState {
  completedSteps: number
  currentStep: number
  isPopup: boolean
  needsSubquiz: boolean
  shadeOption: string | null
  skinToneOption: string | null
  subQuizTone: string | null
  subQuizVeins: string | null
  undertoneOption: string | null
  widgetData: IWidgetData | null
}

export const SET_NEEDS_SUBQUIZ = 'SET_NEEDS_SUBQUIZ'
export const SET_SHADE_OPTION = 'SET_SHADE_OPTION'
export const SET_SKIN_TONE_OPTION = 'SET_SKIN_TONE_OPTION'
export const SET_STEP = 'SET_STEP'
export const SET_SUBQUIZ_TONE = 'SET_SUBQUIZ_TONE'
export const SET_SUBQUIZ_VEINS = 'SET_SUBQUIZ_VEINS'
export const SET_UNDERTONE_OPTION = 'SET_UNDERTONE_OPTION'
export const SET_WIDGET_DATA = 'SET_WIDGET_DATA'

export interface ISetNeedsSubQuiz extends AnyAction {
  payload: boolean
  type: typeof SET_NEEDS_SUBQUIZ
}

export interface ISetShadeOption extends AnyAction {
  payload: string
  type: typeof SET_SHADE_OPTION
}

export interface ISetSkinToneOption extends AnyAction {
  payload: string
  type: typeof SET_SKIN_TONE_OPTION
}

export interface ISetStep extends AnyAction {
  payload: number
  type: typeof SET_STEP
}

export interface ISetSubQuizTone extends AnyAction {
  payload: string
  type: typeof SET_SUBQUIZ_TONE
}

export interface ISetSubQuizVeins extends AnyAction {
  payload: string
  type: typeof SET_SUBQUIZ_VEINS
}

export interface ISetStep extends AnyAction {
  payload: number
  type: typeof SET_STEP
}

export interface ISetUndertoneOption extends AnyAction {
  payload: string
  type: typeof SET_UNDERTONE_OPTION
}

export interface ISetWidgetData extends AnyAction {
  payload: IWidgetData
  type: typeof SET_WIDGET_DATA
}

export type Action =
  ISetNeedsSubQuiz
  | ISetShadeOption
  | ISetSkinToneOption
  | ISetStep
  | ISetSubQuizTone
  | ISetSubQuizVeins
  | ISetUndertoneOption
  | ISetWidgetData

export {
  setNeedsSubquiz,
  setShadeOption,
  setSkinToneOption,
  setStep,
  setSubQuizTone,
  setSubQuizVeins,
  setUndertoneOption,
} from './actions'
export { reducer as appReducer } from './reducer'
export { App } from './components'
