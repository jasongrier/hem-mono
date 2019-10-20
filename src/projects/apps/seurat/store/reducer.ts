import { AnyAction } from 'redux'
import * as presets from '../data/presets'
import {
  SET_CANVAS,
  SET_CURSOR_GROUP,
  SET_CURSOR_MODE,
  SET_DRAGGING,
  SET_PARAM,
  TOGGLE_ON,
  UPDATE_DOT,

  ICanvas,
  IDot,
  IState,
} from './types'

const initialState: IState = {
  canvases: [
    presets.ampDefault,
    presets.bellsDefault,
    presets.drumDefault,
    presets.guitarsDefault,
    presets.pianoDefault,
    presets.saxDefault,
    presets.turntableDefault,
  ],
  currentCanvas: 0,
  cursorGroup: 'white',
  cursorIsDragging: false,
  cursorMode: 'draw',
  params: [.5, .5, .5, .5, .5, .5, .5, .5],
  on: true,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  let newCanvases: ICanvas[] // TODO: Should not have to do this in order to avoid block-scoped variable messages

  switch (type) {
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

    case TOGGLE_ON:
      return { ...state, on: !state.on }

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
