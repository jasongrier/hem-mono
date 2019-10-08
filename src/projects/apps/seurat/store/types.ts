import { AnyAction } from 'redux'

export type BoardSize = 1|2|4|9|16|25|36|48|64|81|100|121
export type CursorGroup = 'empty' | 'white' | 'red' | 'yellow' | 'blue'
export type CursorMode = 'erase' | 'draw'
export type WebVersionPreset = 'amp' | 'bells' | 'drum' | 'guitars' | 'mic' | 'piano' | 'radio' | 'sax' | 'turntable' | 'violin'

export interface ICanvas {
  dots: CursorGroup[]
  size: BoardSize
}

export interface IState {
  canvases: ICanvas[]
  currentBoard: number
  cursorGroup: CursorGroup
  cursorIsDragging: boolean
  cursorMode: CursorMode
  params: number[]
  on: boolean
  webVersionBoardPreset: WebVersionPreset
}

export const SET_CURSOR_GROUP = 'SET_CURSOR_GROUP'
export const SET_CURSOR_MODE = 'SET_CURSOR_MODE'
export const SET_DRAGGING = 'SET_DRAGGING'
export const SET_PARAM = 'SET_PARAM'
export const SET_WEB_VERSION_PRESET = 'SET_WEB_VERSION_PRESET'
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

export interface ISetWebVersionPreset extends AnyAction {
  type: typeof SET_WEB_VERSION_PRESET
  payload: WebVersionPreset
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
  | ISetWebVersionPreset
  | IToggleOn
  | IUpdateDot
