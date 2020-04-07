import { AnyAction } from 'redux'
import {
  ACTIVATE_APP
} from './index'

const activateApp = (): AnyAction => ({
  type: ACTIVATE_APP,
  payload: null,
})

export {
  activateApp,
}
