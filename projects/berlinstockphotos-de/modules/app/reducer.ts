import produce from 'immer'
import {
  Action,

  SOME_ACTION,

  IState,
} from './index'

const initialState: IState = {
  foo: null,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: Action,
): IState => {
  switch (type) {
    case SOME_ACTION: {
      return produce(state, draftState => {
        draftState.foo = 'bar'
      })
    }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
