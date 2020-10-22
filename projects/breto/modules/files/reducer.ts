import { AnyAction } from 'redux'
import produce from 'immer'
import { uniqBy } from 'lodash'
import {
  ADD_FILE,

  IFile,
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
    case ADD_FILE: {
      return produce(state, draftState => {
        const file: IFile = Object.assign({}, {
          lastModifiedDate: payload.lastModifiedDate,
          name: payload.name,
          size: payload.size,
          title: payload.name,
          type: payload.type,
          webkitRelativePath: payload.webkitRelativePath,
        })
        draftState.files = uniqBy(draftState.files.concat([file]), 'name')
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
