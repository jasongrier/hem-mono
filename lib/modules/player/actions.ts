import { AnyAction } from 'redux'
import {
  CLOSE_POPUP,
  OPEN_POPUP,
} from './index'

const closePopup = (): AnyAction => ({
  type: CLOSE_POPUP,
  payload: null,
})

const openPopup = (id: string, data: string): AnyAction => ({
  type: openPopup,
  payload: null,
})

export {
  closePopup,
  openPopup,
}
