import { AnyAction } from 'redux'
import {
  CursorGroup,

  SET_CANVAS,
  SET_CURSOR_GROUP,
  SET_CURSOR_MODE,
  SET_DRAGGING,
  UPDATE_DOT,

  CursorMode,
  SET_PARAM,
  TOGGLE_ON,
} from './types'

const setCanvas = (canvasNumber: number): AnyAction => ({
  type: SET_CANVAS,
  payload: canvasNumber,
})

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
  setCanvas,
  setCursorGroup,
  setCursorMode,
  setDragging,
  setParam,
  toggleOn,
  updateDot,
}
