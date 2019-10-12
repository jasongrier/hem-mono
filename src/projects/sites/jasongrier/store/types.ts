import { AnyAction } from 'redux'

export interface IState {
  foo: boolean
}

export const SOME_ACTION = 'SOME_ACTION'

export interface ISomeAction extends AnyAction {
  type: typeof SOME_ACTION
  payload: boolean
}

export type Action = ISomeAction
