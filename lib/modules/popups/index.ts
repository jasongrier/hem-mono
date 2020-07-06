import { AnyAction } from 'redux'

export interface IState {
  currentlyOpenPopUp: string | null
  propsToChildren: any
  frozen: boolean
}

export const CLOSE_POPUP = 'CLOSE_POPUP'
export const OPEN_POPUP = 'OPEN_POPUP'
export const SET_POPUPS_FROZEN = 'SET_POPUPS_FROZEN'

export interface IClosePopup extends AnyAction {
  type: typeof CLOSE_POPUP
  payload: null
}

export interface IOpenPopup extends AnyAction {
  type: typeof OPEN_POPUP
  payload: { id: string, propsToChildren: any },
}

export interface ISetPopupsFrozen extends AnyAction {
  type: typeof SET_POPUPS_FROZEN
  payload: boolean
}

export type Action = IClosePopup | IOpenPopup | ISetPopupsFrozen

export { closePopup, openPopup, setPopupsFrozen } from './actions'
export { reducer as popupsReducer } from './reducer'
export { PopupContainer } from './components'
