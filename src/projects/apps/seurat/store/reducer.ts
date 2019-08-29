import { AnyAction } from 'redux'
import {
  CursorGroup,

  SET_CURSOR_GROUP,
  SET_DRAGGING,
  UPDATE_DOT,
  SET_CURSOR_MODE,

  IState,
} from './types'

const initialState: IState = {
  boardDots: new Array(100).fill(0),
  boardSize: 100,
  cursorGroup: 1,
  cursorIsDragging: false,
  cursorMode: 'draw',
  settingsAdvancedDrawing: true,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SET_CURSOR_GROUP:
      return { ...state, cursorGroup: payload }

    case SET_CURSOR_MODE:
      return { ...state, cursorMode: payload }

    case SET_DRAGGING:
      return { ...state, cursorIsDragging: payload }

    case UPDATE_DOT:
      const { boardDots } = state
      const newDots: CursorGroup[] = [...boardDots]

      newDots[payload.dotNumber] = payload.value
      return { ...state, boardDots: newDots }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
