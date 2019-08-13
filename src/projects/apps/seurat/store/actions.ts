import {
  CursorGroup,
  CursorMode,

  SET_CURSOR_GROUP,
  SET_CURSOR_MODE,

  Action,
} from './types'

const setCursorGroup = (cursorGroup: CursorGroup): Action => ({
  type: SET_CURSOR_GROUP,
  payload: cursorGroup,
})

const setCursorMode = (cursorMode: CursorMode): Action => ({
  type: SET_CURSOR_MODE,
  payload: cursorMode,
})

export {
  setCursorGroup,
  setCursorMode,
}