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
  shadeOption: string | null
  skinToneOption: string | null
  undertoneOption: string | null
  widgetData: IWidgetData | null
}

export const SET_SHADE_OPTION = 'SET_SHADE_OPTION'
export const SET_SKIN_TONE_OPTION = 'SET_SKIN_TONE_OPTION'
export const SET_STEP = 'SET_STEP'
export const SET_UNDERTONE_OPTION = 'SET_UNDERTONE_OPTION'
export const SET_WIDGET_DATA = 'SET_WIDGET_DATA'

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

export interface ISetUndertoneOption extends AnyAction {
  payload: string
  type: typeof SET_UNDERTONE_OPTION
}

export interface ISetWidgetData extends AnyAction {
  payload: IWidgetData
  type: typeof SET_WIDGET_DATA
}

export type Action =
  ISetShadeOption
  | ISetSkinToneOption
  | ISetStep
  | ISetUndertoneOption
  | ISetWidgetData

export { setShadeOption, setSkinToneOption, setUndertoneOption, setStep } from './actions'
export { reducer as appReducer } from './reducer'
export { App } from './components'
