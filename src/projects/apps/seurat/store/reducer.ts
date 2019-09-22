import { AnyAction } from 'redux'
import {
  CursorGroup,

  SET_CURSOR_GROUP,
  SET_DRAGGING,
  SET_CURSOR_MODE,
  UPDATE_DOT,

  IState,
} from './types'

const initialState: IState = {
  boards: [
    {
      dots: new Array(100).fill('empty'),
      size: 100,
    }
  ],
  currentBoard: 0,
  cursorGroup: 'white',
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
        const currentBoard = state.boards[state.currentBoard]
        const newBoards = [...state.boards]
        const newDots: CursorGroup[] = [...currentBoard.dots]

        newDots[payload.dotNumber] = payload.value
        newBoards[state.currentBoard].dots = newDots

        return { ...state, boards: newBoards }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
