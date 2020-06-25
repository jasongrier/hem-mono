import {
  Action,

  SOME_ACTION,
} from './index'

const someAction = (): Action => ({
  type: SOME_ACTION,
  payload: null,
})

export {
  someAction,
}
