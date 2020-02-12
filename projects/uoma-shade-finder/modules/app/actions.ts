import { AnyAction } from 'redux'
import {
  SET_NEEDS_SUBQUIZ,
  SET_SHADE_OPTION,
  SET_SKIN_TONE_OPTION,
  SET_STEP,
  SET_SUBQUIZ_VEINS,
  SET_SUBQUIZ_TONE,
  SET_UNDERTONE_OPTION,
  SET_WIDGET_DATA,

  IWidgetData,
} from './'

const setNeedsSubquiz = (needsSubquiz: boolean): AnyAction => ({
  type: SET_NEEDS_SUBQUIZ,
  payload: needsSubquiz,
})

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

const setSubQuizTone = (tone: string): AnyAction => ({
  type: SET_SUBQUIZ_TONE,
  payload: tone,
})

const setSubQuizVeins = (veins: string): AnyAction => ({
  type: SET_SUBQUIZ_VEINS,
  payload: veins,
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
  setNeedsSubquiz,
  setShadeOption,
  setSkinToneOption,
  setStep,
  setSubQuizTone,
  setSubQuizVeins,
  setUndertoneOption,
  setWidgetData,
}
