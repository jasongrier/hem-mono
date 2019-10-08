import { AnyAction } from 'redux'
import { webVersionBoardSizeFromPreset, newBoard } from '../helpers'
import {
  CursorGroup,

  SET_CURSOR_GROUP,
  SET_CURSOR_MODE,
  SET_DRAGGING,
  SET_PARAM,
  SET_WEB_VERSION_PRESET,
  UPDATE_DOT,

  IBoard,
  IState,
} from './types'

const initialState: IState = {
  boards: [
    newBoard(100),
  ],
  currentBoard: 0,
  cursorGroup: 'white',
  cursorIsDragging: false,
  cursorMode: 'draw',
  params: [.5, .5, .5, .5, .5, .5, .5, .5],
  settingsAdvancedDrawing: true,
  webVersionBoardPreset: 'amp'
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  let newBoards: IBoard[] // TODO: Should not have to do this in order to avoid block-scoped variable messages

  switch (type) {
    case SET_CURSOR_GROUP:
      return { ...state, cursorGroup: payload }

    case SET_CURSOR_MODE:
      return { ...state, cursorMode: payload }

    case SET_DRAGGING:
      return { ...state, cursorIsDragging: payload }

    case SET_PARAM:
      const params = [...state.params]
      params[payload.index] = payload.value
      return { ...state, params }

    case SET_WEB_VERSION_PRESET:
      const { boards } = state
      newBoards = ([] as IBoard[]).concat(boards)
      newBoards[0] = newBoard(webVersionBoardSizeFromPreset(payload)) // TODO: Support multiple boards
      return { ...state, boards: newBoards, webVersionBoardPreset: payload }

    case UPDATE_DOT:
      const currentBoard = state.boards[state.currentBoard]
      newBoards = [...state.boards]
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
