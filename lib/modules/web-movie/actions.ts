import {
  SOME_ACTION,

  Action,
} from './index'

const someAction = (foo: string): Action => ({
  type: SOME_ACTION,
  payload: foo,
})

export {
  someAction,
}
