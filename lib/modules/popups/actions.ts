import { AnyAction } from 'redux'
import {
  CLOSE_POPUP,
  OPEN_POPUP,
} from './index'

const closePopup = (): AnyAction => ({
  type: CLOSE_POPUP,
  payload: null,
})

const openPopup = (id: string, propsToChildren?: any): AnyAction => ({
  type: OPEN_POPUP,
  payload: { id, propsToChildren },
})

export {
  closePopup,
  openPopup,
}
