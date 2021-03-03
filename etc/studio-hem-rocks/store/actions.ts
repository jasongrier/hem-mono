import { AnyAction } from 'redux'
import {
  SOME_ACTION
} from './types'

const someAction = (): AnyAction => ({
  type: SOME_ACTION,
  payload: null,
})

export {
  someAction,
}
