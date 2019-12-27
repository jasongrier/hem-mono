import { AnyAction } from 'redux'

export interface IState {
  stuckPencil: boolean
  stuckPlayer: boolean
}

export const SET_STUCK_PENCIL = 'SET_STUCK_PENCIL'
export const SET_STUCK_PLAYER = 'SET_STUCK_PLAYER'

export interface ISetStuckPencil extends AnyAction {
  type: typeof SET_STUCK_PENCIL
  payload: boolean
}

export interface ISetStuckPlayer extends AnyAction {
  type: typeof SET_STUCK_PLAYER
  payload: boolean
}

export type Action = ISetStuckPencil | ISetStuckPlayer

export { setStuckPencil, setStuckPlayer } from './actions'
export { reducer } from './reducer'
