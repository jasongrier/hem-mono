import { AnyAction } from 'redux'

export interface IState {
  currentlyOpenPopUp: string | null
  popupPayload: any
}

export const SOME_ACTION = 'SOME_ACTION'

export interface ISomeAction extends AnyAction {
  type: typeof SOME_ACTION
  payload: null
}

export type Action = ISomeAction

export { reducer as popupsReducer } from './reducer'
export { PopupContainer } from './components'
