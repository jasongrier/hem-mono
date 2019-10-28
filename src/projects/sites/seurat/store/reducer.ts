import { AnyAction } from 'redux'
import { createCanvas } from '../functions/canvas'
import { immutablePush } from '../functions/util'
import * as presets from '../data/presets'
import { DO_OPENING_SEQUENCE } from '../config'
import {
  CLEAR_CANVAS,
  OPENING_SEQUENCE_BEGUN,
  OPENING_SEQUENCE_DONE,
  REDO,
  SET_CUE_MODE,
  SET_CURRENT_CANVAS,
  SET_CURSOR_GROUP,
  SET_CURSOR_MODE,
  SET_DEVICE_ON,
  SET_DRAGGING,
  SET_DRUM_MODE,
  SET_MAIN_VOLUME,
  SET_PLAYING,
  UNDO,
  UPDATE_CONTROL,
  UPDATE_DOT,

  ICanvas,
  IControls,
  IDot,
  IState,
} from './types'

const blankCanvas = createCanvas('empty')

const initialState: IState = {
  canvases: new Array(100).fill(blankCanvas),
  codeEditorOpen: false,
  cueMode: false,
  currentCanvasIndex: 0,
  cursorGroup: 'a',
  cursorMode: 'draw',
  dragging: false,
  drumMode: false,
  eventInProgess: DO_OPENING_SEQUENCE,
  mainVolume: 0.5,
  on: true,
  playing: true,
  undoIndex: 0,
  undoStack: [],
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  let currentCanvas: ICanvas
  let newCanvases: ICanvas[]
  let newControls: IControls[]
  let newDots: IDot[]
  let newUndoStack: IState[]

  switch (type) { // TODO: All projects. This `switch` be `if... else if` to allow block scoped vars
    case CLEAR_CANVAS:
      newUndoStack = immutablePush(state.undoStack, state)

      currentCanvas = state.canvases[state.currentCanvasIndex]
      newDots = [...currentCanvas.dots].map(dot => ({
        cursorGroup: 'none',
        sound: dot.sound,
      }))

      newCanvases = [...state.canvases]
      newCanvases[state.currentCanvasIndex].dots = newDots

      return {
        ...state,
        canvases: newCanvases,
        undoIndex: state.undoIndex + 1,
        undoStack: newUndoStack,
      }

    case OPENING_SEQUENCE_BEGUN:
      return { ...state, eventInProgess: true }

    case OPENING_SEQUENCE_DONE:
      return { ...state, eventInProgess: false }

    case REDO:
      return { ...state }

    case SET_CUE_MODE:
      return { ...state, cueMode: payload }

    case SET_CURRENT_CANVAS:
      return { ...state, currentCanvasIndex: payload }

    case SET_CURSOR_GROUP:
      return { ...state, cursorGroup: payload }

    case SET_CURSOR_MODE:
      return { ...state, cursorMode: payload }

    case SET_DRAGGING:
      return { ...state, dragging: payload }

    case SET_DRUM_MODE:
      return { ...state, drumMode: payload }

    case SET_MAIN_VOLUME:
      return { ...state, mainVolume: payload }

    case SET_PLAYING:
      return { ...state, playing: payload }

    case SET_DEVICE_ON:
      return { ...state, on: payload }

    case UNDO:
        return { ...state }

    case UPDATE_CONTROL:
      const { cursorGroup, key, value } = payload
      newControls = {...state.canvases[state.currentCanvasIndex].controls[cursorGroup]}
      newControls[key] = value

      newCanvases = [...state.canvases]
      newCanvases[state.currentCanvasIndex].controls[cursorGroup] = newControls

      return { ...state, canvases: newCanvases }

    case UPDATE_DOT:
      currentCanvas = state.canvases[state.currentCanvasIndex]
      newDots = [...currentCanvas.dots]
      newDots[payload.dotNumber] = {
        cursorGroup: payload.cursorGroup,
        sound: payload.sound,
      }

      newCanvases = [...state.canvases]
      newCanvases[state.currentCanvasIndex].dots = newDots

      return { ...state, canvases: newCanvases }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
