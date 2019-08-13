import { AnyAction } from 'redux'
import {
  SET_CURSOR_GROUP,
  SET_CURSOR_MODE,

  IState,
} from './types'

const initialState: IState = {
  boardSize: 16,
  cursorGroup: 1,
  cursorMode: 'draw'
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SET_CURSOR_GROUP:
      return { ...state, cursorGroup: payload }

    case SET_CURSOR_MODE:
      return { ...state, cursorMode: payload }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
