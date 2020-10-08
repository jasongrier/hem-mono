import { AnyAction } from 'redux'
import produce from 'immer'
import { uniq } from 'lodash'
import {
  ADD_FILES,
  ADD_FOLDER,

  IState,
} from './index'

const initialState: IState = {
  files: [],
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case ADD_FILES: {
      return produce(state, draftState => {
        draftState.files = uniq(draftState.files.concat(payload))
      })
    }

    case ADD_FOLDER:
    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
