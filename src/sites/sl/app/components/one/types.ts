export interface IState {
  someBit: boolean
  anotherBit: boolean
}

export const SOME_ACTION = 'SOME_ACTION'
export const ANOTHER_ACTION = 'ANOTHER_ACTION'

export interface ISomeAction extends IAction {
  type: typeof SOME_ACTION
  payload: boolean
}

export interface IAnotherAction extends IAction {
  type: typeof ANOTHER_ACTION
  payload: boolean
}

export type Action =
    ISomeAction
  | IAnotherAction
