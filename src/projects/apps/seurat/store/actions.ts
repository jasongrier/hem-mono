import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from './'
import {
  CursorGroup,

  SET_CURSOR_GROUP,
  UPDATE_DOT,
  SET_DRAGGING,
  SET_CURSOR_MODE,
  TOGGLE_DRAWER,

  Action,
  CursorMode,
} from './types'

const setCursorGroup = (cursorGroup: CursorGroup): Action => ({
  type: SET_CURSOR_GROUP,
  payload: cursorGroup,
})

const updateDot = ({dotNumber, value}: {dotNumber: number, value: CursorGroup}): Action => ({
  type: UPDATE_DOT,
  payload: {dotNumber, value},
})

const setDragging = (isDragging: boolean): Action => ({
  type: SET_DRAGGING,
  payload: isDragging,
})

const setCursorMode = (cursorMode: CursorMode): Action => ({
  type: SET_CURSOR_MODE,
  payload: cursorMode,
})

const toggleDrawer = (): ThunkAction<void, RootState, null, AnyAction> => async dispatch => {
  dispatch({ type: TOGGLE_DRAWER })
}

export {
  setCursorGroup,
  setCursorMode,
  setDragging,
  toggleDrawer,
  updateDot,
}
