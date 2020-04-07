import { AnyAction } from 'redux'
import {
  SOME_ACTION
} from './index'

const someAction = (): AnyAction => ({
  type: SOME_ACTION,
  payload: null,
})

export {
  someAction,
}
