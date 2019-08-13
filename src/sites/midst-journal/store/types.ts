export type BoardSize = 1|2|4|9|16|25|36|48|64|81|100|121
export type CursorGroup = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16
export type CursorMode = 'draw' | 'erase'

export interface IState {
  boardSize: BoardSize
  cursorGroup: CursorGroup
  cursorMode: CursorMode
}

export const SET_CURSOR_GROUP = 'SET_CURSOR_GROUP'
export const SET_CURSOR_MODE = 'SET_CURSOR_MODE'

export interface ISomeAction extends IAction {
  type: typeof SET_CURSOR_GROUP
  payload: CursorGroup
}

export interface IAnotherAction extends IAction {
  type: typeof SET_CURSOR_MODE
  payload: CursorMode
}

export type Action =
    ISomeAction
  | IAnotherAction
