import { AnyAction } from 'redux'
import { webVersionBoardSizeFromPreset, newCanvas } from '../helpers'
import {
  CursorGroup,

  SET_CURSOR_GROUP,
  SET_CURSOR_MODE,
  SET_DRAGGING,
  SET_PARAM,
  SET_WEB_VERSION_PRESET,
  UPDATE_DOT,

  ICanvas,
  IState,
  TOGGLE_ON,
} from './types'

const initialState: IState = {
  canvases: [
    newCanvas(100),
  ],
  currentBoard: 0,
  cursorGroup: 'white',
  cursorIsDragging: false,
  cursorMode: 'draw',
  params: [.5, .5, .5, .5, .5, .5, .5, .5],
  on: true,
  webVersionBoardPreset: 'amp'
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  let newCanvases: ICanvas[] // TODO: Should not have to do this in order to avoid block-scoped variable messages

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
      const { canvases } = state
      newCanvases = ([] as ICanvas[]).concat(canvases)
      newCanvases[0] = newCanvas(webVersionBoardSizeFromPreset(payload)) // TODO: Support multiple canvases
      return { ...state, canvases: newCanvases, webVersionBoardPreset: payload }

    case TOGGLE_ON:
      return { ...state, on: !state.on }

    case UPDATE_DOT:
      const currentBoard = state.canvases[state.currentBoard]
      newCanvases = [...state.canvases]
      const newDots: CursorGroup[] = [...currentBoard.dots]

      newDots[payload.dotNumber] = payload.value
      newCanvases[state.currentBoard].dots = newDots

      return { ...state, canvases: newCanvases }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
