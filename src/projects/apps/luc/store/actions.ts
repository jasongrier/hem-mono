import { AnyAction } from 'redux'
import {
  PLACEHOLDER_ACTION,
} from './types'

const placeholderAction = (placeholderUpdate: any): AnyAction => ({
  type: PLACEHOLDER_ACTION,
  payload: placeholderUpdate,
})

export {
  placeholderAction,
}
