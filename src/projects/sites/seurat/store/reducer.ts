import { AnyAction } from 'redux'
import * as presets from '../data/presets'
import {
  OPENING_SEQUENCE_BEGUN,
  OPENING_SEQUENCE_DONE,
  SET_CANVAS,
  SET_CURSOR_GROUP,
  SET_CURSOR_MODE,
  SET_ON,
  SET_DRAGGING,
  SET_PARAM,
  UPDATE_DOT,

  ICanvas,
  IDot,
  IState,
} from './types'

const initialState: IState = {
  canvases: [
    presets.testTones,
  ],
  currentCanvas: 0,
  cursorGroup: 'white',
  cursorIsDragging: false,
  cursorMode: 'draw',
  eventInProgess: true,
  params: [.5, .5, .5, .5, .5, .5, .5, .5],
  on: true,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  let newCanvases: ICanvas[]

  switch (type) { // TODO: All projects. This `switch` be `if... else if` to allow block scoped vars
    case OPENING_SEQUENCE_BEGUN:
      return { ...state, eventInProgess: true }

    case OPENING_SEQUENCE_DONE:
      return { ...state, eventInProgess: false }

    case SET_CANVAS:
      return { ...state, currentCanvas: payload }

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

    case SET_ON:
      return { ...state, on: payload }

    case UPDATE_DOT:
      const currentCanvas = state.canvases[state.currentCanvas]
      const newDots: IDot[] = [...currentCanvas.dots]

      newCanvases = [...state.canvases]

      newDots[payload.dotNumber] = {
        cursorGroup: payload.cursorGroup,
        sound: payload.sound,
      }

      newCanvases[state.currentCanvas].dots = newDots

      return { ...state, canvases: newCanvases }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
