import { AnyAction } from 'redux'
import { SOME_ACTION } from './index'

const someAction = (foo: string): AnyAction => ({
  type: SOME_ACTION,
  payload: foo,
})

export { someAction }
