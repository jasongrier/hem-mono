import { AnyAction } from 'redux'

export type BoardSize = 1|2|4|9|16|25|36|48|64|81|100|121
export type CursorGroup = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16
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
  drawerOpen: boolean
  settingsAdvancedDrawing: Boolean
}

export const SET_CURSOR_GROUP = 'SET_CURSOR_GROUP'
export const SET_DRAGGING = 'SET_DRAGGING'
export const SET_CURSOR_MODE = 'SET_CURSOR_MODE'
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

export interface IUpdateDot extends AnyAction {
  type: typeof UPDATE_DOT
  payload: {dotNumber: number, value: CursorGroup}
}

export interface IToggleDrawer extends AnyAction {
  type: typeof TOGGLE_DRAWER
  payload: null
}

export type Action =
    ISetCursorGroup
  | ISetCursorMode
  | ISetDragging
  | IToggleDrawer
  | IUpdateDot
