import { AnyAction } from 'redux'
import produce from 'immer'
import { capitalize } from 'voca'
import {
  LOAD_PROJECT,
  NEW_PROJECT,
  OPEN_PROJECT,
  SAVE_PROJECT,

  IState,
} from './index'

const initialState: IState = {
  currentProject: null,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case LOAD_PROJECT: {
      return produce(state, draftState => {
        draftState.currentProject = payload
      })
    }

    case NEW_PROJECT:
    case OPEN_PROJECT:
    case SAVE_PROJECT:
    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
