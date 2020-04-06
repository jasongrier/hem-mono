import { AnyAction } from 'redux'

export interface IState {
  currentlyOpenPopUp: string | null
  popupData: any
}

export const CLOSE_POPUP = 'CLOSE_POPUP'
export const OPEN_POPUP = 'OPEN_POPUP'

export interface IClosePopup extends AnyAction {
  type: typeof CLOSE_POPUP
  payload: null
}

export interface IOpenPopup extends AnyAction {
  type: typeof OPEN_POPUP
  payload: {
    id: string,
    data: string,
  }
}

export type Action =
  IClosePopup
  | IOpenPopup

export { reducer as popupsReducer } from './reducer'
export { PopupContainer } from './components'
