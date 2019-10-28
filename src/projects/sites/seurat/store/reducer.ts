import { AnyAction } from 'redux'
import { merge } from 'lodash' // TODO: Replace with Immer
import produce from 'immer'
import { createCanvas } from '../functions/canvas'
import { immutablePush } from '../functions/util' // TODO: Replace with Immer
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
  canvases: new Array(100).fill(merge({}, blankCanvas)),
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
  switch (type) { // TODO: All projects. Wrap cases in {} to scope these lets above as consts
    case CLEAR_CANVAS: {
        return produce(state, draftState => { // TODO: Undo/redo decorator HoFn
          const draftDots = draftState.canvases[draftState.currentCanvasIndex].dots
          draftDots.map(dot => ({
            cursorGroup: 'none',
            sound: dot.sound,
          }))
        })
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

    case UPDATE_CONTROL: {
      const { cursorGroup, key, value } = payload
      return produce(state, draftState => {
        draftState.canvases[draftState.currentCanvasIndex].controls[cursorGroup].cursorGroup[key] = value
      })
    }

    case UPDATE_DOT: {
      const { cursorGroup, dotNumber } = payload
      return produce(state, draftState => {
        draftState.canvases[draftState.currentCanvasIndex].dots[dotNumber].cursorGroup = cursorGroup
      })
    }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
