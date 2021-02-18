import {
  SOME_ACTION,

  Action,
} from './index'

const someAction = (foo: boolean): Action => ({
  type: SOME_ACTION,
  payload: foo,
})

export {
  someAction,
}
