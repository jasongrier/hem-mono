import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from './'
import {
  CursorGroup,

  SET_CURSOR_GROUP,
  UPDATE_DOT,
  SET_DRAGGING,
  SET_CURSOR_MODE,
  SET_WEB_VERSION_PRESET,

  Action,
  CursorMode,
  SET_PARAM,
  WebVersionPreset,
  TOGGLE_ON,
} from './types'

const setCursorGroup = (cursorGroup: CursorGroup): Action => ({
  type: SET_CURSOR_GROUP,
  payload: cursorGroup,
})

const setCursorMode = (cursorMode: CursorMode): Action => ({
  type: SET_CURSOR_MODE,
  payload: cursorMode,
})

const setDragging = (isDragging: boolean): Action => ({
  type: SET_DRAGGING,
  payload: isDragging,
})

const setWebVersionPreset = (preset: WebVersionPreset): Action => ({
  type: SET_WEB_VERSION_PRESET,
  payload: preset,
})

const setParam = ({ index, value }: { index: number, value: number }): Action => ({
  type: SET_PARAM,
  payload: { index, value },
})

const toggleOn = (): Action => ({
  type: TOGGLE_ON,
  payload: null,
})

const updateDot = ({dotNumber, value}: {dotNumber: number, value: CursorGroup}): Action => ({
  type: UPDATE_DOT,
  payload: {dotNumber, value},
})

export {
  setCursorGroup,
  setCursorMode,
  setDragging,
  setParam,
  setWebVersionPreset,
  toggleOn,
  updateDot,
}
