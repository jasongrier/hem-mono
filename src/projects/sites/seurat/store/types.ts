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
  currentCanvas: number
  cursorGroup: CursorGroup
  cursorIsDragging: boolean
  cursorMode: CursorMode
  eventInProgess: boolean
  on: boolean
  params: number[]
}

export const OPENING_SEQUENCE_BEGUN = 'OPENING_SEQUENCE_BEGUN'
export const OPENING_SEQUENCE_DONE = 'OPENING_SEQUENCE_DONE'
export const SET_CANVAS = 'SET_CANVAS'
export const SET_CURSOR_GROUP = 'SET_CURSOR_GROUP'
export const SET_CURSOR_MODE = 'SET_CURSOR_MODE'
export const SET_DRAGGING = 'SET_DRAGGING'
export const SET_ON = 'SET_ON'
export const SET_PARAM = 'SET_PARAM'
export const SET_PRESET = 'SET_PRESET'
export const UPDATE_DOT = 'UPDATE_DOT'

export interface IOpeningSequenceBegun extends AnyAction {
  type: typeof OPENING_SEQUENCE_BEGUN
  payload: null
}

export interface IOpeningSequenceDone extends AnyAction {
  type: typeof OPENING_SEQUENCE_DONE
  payload: null
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

export interface ISetOn extends AnyAction {
  type: typeof SET_ON
  payload: boolean
}

export interface ISetParam extends AnyAction {
  type: typeof SET_PARAM
  payload: { index: number, value: number }
}

export interface IUpdateDot extends AnyAction {
  type: typeof UPDATE_DOT
  payload: {dotNumber: number, value: CursorGroup}
}

export type Action =
    IOpeningSequenceBegun
  | IOpeningSequenceDone
  | ISetCursorGroup
  | ISetCursorMode
  | ISetDragging
  | ISetOn
  | ISetParam
  | IUpdateDot
