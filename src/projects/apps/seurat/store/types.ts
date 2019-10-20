import { AnyAction } from 'redux'

export type CanvasSize = 1|2|4|9|16|25|36|48|64|81|100|121
export type CursorGroup = 'empty' | 'white' | 'red' | 'yellow' | 'blue'
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
  on: boolean
  params: number[]
}

export const SET_CURSOR_GROUP = 'SET_CURSOR_GROUP'
export const SET_CURSOR_MODE = 'SET_CURSOR_MODE'
export const SET_DRAGGING = 'SET_DRAGGING'
export const SET_PARAM = 'SET_PARAM'
export const SET_PRESET = 'SET_PRESET'
export const TOGGLE_ON = 'TOGGLE_ON'
export const UPDATE_DOT = 'UPDATE_DOT'

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

export interface ISetParam extends AnyAction {
  type: typeof SET_PARAM
  payload: { index: number, value: number }
}

export interface ILoadPreset extends AnyAction {
  type: typeof SET_PRESET
  payload: ICanvas
}

export interface IToggleOn extends AnyAction {
  type: typeof TOGGLE_ON
  payload: null
}

export interface IUpdateDot extends AnyAction {
  type: typeof UPDATE_DOT
  payload: {dotNumber: number, value: CursorGroup}
}

export type Action =
    ISetCursorGroup
  | ISetCursorMode
  | ISetDragging
  | ISetParam
  | ILoadPreset
  | IToggleOn
  | IUpdateDot
