import { AnyAction } from 'redux'
import produce from 'immer'
import uuid from 'uuid/v1'
import { findIndex } from 'lodash'
import {
  ADD_ANNOTATION,
  REMOVE_ANNOTATION,

  IState,
} from './index'

const initialState: IState = {
  annotations: [],
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case ADD_ANNOTATION: {
      return produce(state, draftState => {
        const newAnnotation = Object.assign({}, payload)

        newAnnotation.id = uuid()

        draftState.annotations.push(newAnnotation)
        draftState.annotations.sort((a, b) => parseInt(a.timestamp, 10) - parseInt(b.timestamp, 10))
      })
    }

    case REMOVE_ANNOTATION: {
      return produce(state, draftState => {
        const index = findIndex(draftState.annotations, { id: payload })
        draftState.annotations.splice(index, 1)
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
