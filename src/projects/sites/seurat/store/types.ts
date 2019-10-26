import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

export type ThunkResult<R> = ThunkAction<R, IState, undefined, Action> // TODO: How to get around putting this in every project??
export type CursorGroup = 'red' | 'yellow' | 'blue' | 'white' | 'none'
export type CursorMode = 'erase' | 'draw'

export interface ISound {
  [note: string]: string
}

export interface IDot {
  cursorGroup: CursorGroup
  sound: string
}

export interface ICanvas {
  defaultSound: string
  dots: IDot[]
  name: string
}

export interface IState {
  canvases: ICanvas[]
  currentCanvasIndex: number
  cursorGroup: CursorGroup
  cursorIsDragging: boolean
  cursorMode: CursorMode
  eventInProgess: boolean
  on: boolean
  params: number[]
  playing: boolean
}

export const CLEAR_CANVAS = 'CLEAR_CANVAS'
export const OPENING_SEQUENCE_BEGUN = 'OPENING_SEQUENCE_BEGUN'
export const OPENING_SEQUENCE_DONE = 'OPENING_SEQUENCE_DONE'
export const SET_CURRENT_CANVAS = 'SET_CURRENT_CANVAS'
export const SET_CURSOR_GROUP = 'SET_CURSOR_GROUP'
export const SET_CURSOR_MODE = 'SET_CURSOR_MODE'
export const SET_DRAGGING = 'SET_DRAGGING'
export const SET_DEVICE_ON = 'SET_DEVICE_ON'
export const SET_PARAM = 'SET_PARAM'
export const SET_PLAYING = 'SET_PLAYING'
export const UPDATE_DOT = 'UPDATE_DOT'

export interface IClearCanvas extends AnyAction {
  type: typeof CLEAR_CANVAS
  payload: null
}

export interface IOpeningSequenceBegun extends AnyAction {
  type: typeof OPENING_SEQUENCE_BEGUN
  payload: null
}

export interface IOpeningSequenceDone extends AnyAction {
  type: typeof OPENING_SEQUENCE_DONE
  payload: null
}

export interface ISetCanvas extends AnyAction {
  type: typeof SET_CURRENT_CANVAS
  payload: number
}

export interface ISetCursorGroup extends AnyAction {
  type: typeof SET_CURSOR_GROUP
  payload: CursorGroup
}

export interface ISetCursorMode extends AnyAction {
  type: typeof SET_CURSOR_MODE
  payload: CursorMode
}

export interface ISetDragging extends AnyAction {
  type: typeof SET_DRAGGING
  payload: boolean
}

export interface ISetDeviceOn extends AnyAction {
  type: typeof SET_DEVICE_ON
  payload: boolean
}

export interface ISetParam extends AnyAction {
  type: typeof SET_PARAM
  payload: { index: number, value: number }
}

export interface ISetPlaying extends AnyAction {
  type: typeof SET_PLAYING
  payload: boolean
}

export interface IUpdateDot extends AnyAction {
  type: typeof UPDATE_DOT
  payload: {dotNumber: number, value: CursorGroup}
}

export type Action =
    IClearCanvas
  | IOpeningSequenceBegun
  | IOpeningSequenceDone
  | ISetCursorGroup
  | ISetCursorMode
  | ISetDragging
  | ISetDeviceOn
  | ISetParam
  | ISetPlaying
  | IUpdateDot
