import { AnyAction } from 'redux'
import produce from 'immer'
import uuid from 'uuid/v1'
import {
  SET_CURRENT_CONTENT_ITEM,

  IState,
} from './index'

import contentItems from './data'

const initialState: IState = {
  currentContentItem: null,
  contentItems,
}

const reducer = (
  state: IState = initialState,
  { payload, type }: AnyAction,
): IState => {
  switch (type) {
    case SET_CURRENT_CONTENT_ITEM: {
      return produce(state, draftState => {
        draftState.currentContentItem = payload
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
