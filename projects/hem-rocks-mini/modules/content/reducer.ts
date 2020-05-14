import { AnyAction } from 'redux'
import produce from 'immer'
import { uniqBy } from 'lodash'
import {
  CLEAR_ITEMS,
  DO_CREATE_ITEMS,
  DO_DELETE_ITEMS,
  DO_READ_ITEMS,
  DO_UPDATE_ITEMS,
  REQUEST_CREATE_ITEMS,
  REQUEST_DELETE_ITEMS,
  REQUEST_READ_ITEMS,
  REQUEST_UPDATE_ITEMS,
  SET_CURRENT_ITEM,

  IState,
} from './index'
import contentItems from '../../static/content'

const initialState: IState = {
  currentContentItem: null,
  contentItems,
}

const reducer = (
  state: IState = initialState,
  { payload, type }: AnyAction,
): IState => {
  switch (type) {
    case CLEAR_ITEMS: {
      return produce(state, draftState => {
        draftState.contentItems = []
      })
    }

    case DO_CREATE_ITEMS: {
      return produce(state, draftState => {
        draftState.contentItems = uniqBy([].concat(state.contentItems).concat(payload), 'slug')
      })
    }

    case DO_DELETE_ITEMS: {
      return produce(state, draftState => {
        draftState.contentItems = [].concat(state.contentItems).filter(i => !payload.includes(i.slug))
      })
    }

    case DO_READ_ITEMS: {
      return produce(state, draftState => {
        draftState.contentItems = payload
      })
    }

    case DO_UPDATE_ITEMS:
    case REQUEST_CREATE_ITEMS:
    case REQUEST_DELETE_ITEMS:
    case REQUEST_READ_ITEMS:
    case REQUEST_UPDATE_ITEMS:

    case SET_CURRENT_ITEM: {
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
