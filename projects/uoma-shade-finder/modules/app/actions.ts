import { AnyAction } from 'redux'
import {
  SET_SHADE_OPTION,
  SET_SKIN_TONE_OPTION,
  SET_STEP,
  SET_UNDERTONE_OPTION,
  SET_WIDGET_DATA,

  IWidgetData,
} from './'

const setShadeOption = (optionName: string): AnyAction => ({
  type: SET_SHADE_OPTION,
  payload: optionName,
})

const setSkinToneOption = (optionName: string): AnyAction => ({
  type: SET_SKIN_TONE_OPTION,
  payload: optionName,
})

const setStep = (stepNumber: number): AnyAction => ({
  type: SET_STEP,
  payload: stepNumber,
})

const setUndertoneOption = (undertoneOption: string): AnyAction => ({
  type: SET_UNDERTONE_OPTION,
  payload: undertoneOption,
})

const setWidgetData = (widgetData: IWidgetData): AnyAction => ({
  type: SET_WIDGET_DATA,
  payload: widgetData,
})

export {
  setShadeOption,
  setSkinToneOption,
  setStep,
  setUndertoneOption,
  setWidgetData,
}
