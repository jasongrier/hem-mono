import { AnyAction } from 'redux'
import {
  CursorGroup,

  SET_CURSOR_GROUP,
  UPDATE_DOT,
  SET_DRAGGING,
  SET_CURSOR_MODE,

  CursorMode,
  SET_PARAM,
  TOGGLE_ON,
} from './types'

const setCursorGroup = (cursorGroup: CursorGroup): AnyAction => ({
  type: SET_CURSOR_GROUP,
  payload: cursorGroup,
})

const setCursorMode = (cursorMode: CursorMode): AnyAction => ({
  type: SET_CURSOR_MODE,
  payload: cursorMode,
})

const setDragging = (isDragging: boolean): AnyAction => ({
  type: SET_DRAGGING,
  payload: isDragging,
})

const setParam = ({ index, value }: { index: number, value: number }): AnyAction => ({
  type: SET_PARAM,
  payload: { index, value },
})

const toggleOn = (): AnyAction => ({
  type: TOGGLE_ON,
  payload: null,
})

const updateDot = ({
  cursorGroup,
  dotNumber,
  sound,
}: {
  cursorGroup: CursorGroup,
  dotNumber: number,
  sound: string,
}): AnyAction => ({
  type: UPDATE_DOT,
  payload: { dotNumber, cursorGroup, sound },
})

export {
  setCursorGroup,
  setCursorMode,
  setDragging,
  setParam,
  toggleOn,
  updateDot,
}
