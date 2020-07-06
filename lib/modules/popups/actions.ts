import { AnyAction } from 'redux'
import {
  CLOSE_POPUP,
  OPEN_POPUP,
  SET_POPUPS_FROZEN,
} from './index'

const closePopup = (): AnyAction => ({
  type: CLOSE_POPUP,
  payload: null,
})

const openPopup = (id: string, propsToChildren?: any): AnyAction => ({
  type: OPEN_POPUP,
  payload: { id, propsToChildren },
})

const setPopupsFrozen = (popupsFrozen: boolean): AnyAction => ({
  type: SET_POPUPS_FROZEN,
  payload: popupsFrozen
})

export {
  closePopup,
  openPopup,
  setPopupsFrozen,
}
