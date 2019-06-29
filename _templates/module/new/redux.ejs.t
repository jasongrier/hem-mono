---
to: src/<%= name %>/redux.ts
---
import got from 'got'
import { ThunkAction } from 'redux-thunk'
import {
  SOME_ACTION,
  ANOTHER_ACTION,

  IState,

  Action,
} from './types'

// ================================================================================
// Actions
// ================================================================================
const someActionCreator = (someBit: boolean): Action => ({
  type: SOME_ACTION,
  payload: someBit,
})

const anotherActionCreator = (anotherBit: boolean): Action => ({
  type: ANOTHER_ACTION,
  payload: anotherBit,
})

const someThunkActionCreator = (): ThunkAction<void, IState, null, Action> => async dispatch => {
  dispatch(anotherActionCreator(!!await got('sindresorhus.com')))
}

// ================================================================================
// Reducer
// ================================================================================
const initialState: IState = {
  someBit: false,
  anotherBit: false,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: IAction,
): IState => {
  switch (type) {
    case SOME_ACTION:
      return { ...state, someBit: payload }

    case ANOTHER_ACTION:
      return { ...state, anotherBit: payload }

    default:
      return state
  }
}

export {
  someActionCreator,
  anotherActionCreator,
  someThunkActionCreator,

  initialState,

  reducer,
}
