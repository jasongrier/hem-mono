import { AnyAction } from 'redux'

export type BoardSize = 1|2|4|9|16|25|36|48|64|81|100|121
export type CursorGroup = 'empty' | 'white' | 'red' | 'yellow' | 'blue'
export type CursorMode = 'erase' | 'draw'

export interface IBoard {
  dots: CursorGroup[]
  size: BoardSize
}

export interface IState {
  boards: IBoard[]
  currentBoard: number
  cursorGroup: CursorGroup
  cursorIsDragging: boolean
  cursorMode: CursorMode
  params: number[]
  settingsAdvancedDrawing: Boolean
}

export const SET_CURSOR_GROUP = 'SET_CURSOR_GROUP'
export const SET_CURSOR_MODE = 'SET_CURSOR_MODE'
export const SET_DRAGGING = 'SET_DRAGGING'
export const SET_PARAM = 'SET_PARAM'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
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

export interface IToggleDrawer extends AnyAction {
  type: typeof TOGGLE_DRAWER
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
  | IToggleDrawer
  | IUpdateDot
