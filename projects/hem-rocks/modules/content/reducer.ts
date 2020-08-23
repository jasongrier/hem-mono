import { AnyAction } from 'redux'
import produce from 'immer'
import { uniqBy } from 'lodash'
import {
  ADMIN_APPLY_FILTER,
  ADMIN_APPLY_SEARCH,
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
  TOGGLE_NEEDS_KEY_ART_FILTER,
  TOGGLE_SHOW_UNPUBLISHED_FILTER,

  IState,
  IContentItem,
} from './index'

const initialState: IState = {
  adminFilterApplied: 'all',
  adminSearchApplied: '',
  currentContentItem: null,
  contentItems: [],
  needsKeyArtFilter: false,
  showUnpublishedFilter: false,
}

const reducer = (
  state: IState = initialState,
  { payload, type }: AnyAction,
): IState => {
  switch (type) {
    case ADMIN_APPLY_FILTER: {
      return produce(state, draftState => {
        draftState.adminFilterApplied = payload
      })
    }
    
    case ADMIN_APPLY_SEARCH: {
      return produce(state, draftState => {
        draftState.adminSearchApplied = payload
      })
    }

    case CLEAR_ITEMS: {
      return produce(state, draftState => {
        draftState.contentItems = []
      })
    }

    case DO_CREATE_ITEMS: {
      return produce(state, draftState => {
        // @ts-ignore
        draftState.contentItems = uniqBy([].concat(state.contentItems).concat(payload), 'slug')
      })
    }

    case DO_DELETE_ITEMS: {
      return produce(state, draftState => {
        // @ts-ignore
        draftState.contentItems = [].concat(state.contentItems).filter((item: IContentItem) => !payload.includes(item.slug))
      })
    }

    case DO_READ_ITEMS: {
      return produce(state, draftState => {
        draftState.contentItems = payload
      })
    }

    case DO_UPDATE_ITEMS: {
      return produce(state, draftState => {
        for (const updatedItem of payload) {

          const itemIndex = draftState.contentItems.findIndex(
            item => item.slug === updatedItem.slug
          )

          if (itemIndex < 0) throw new Error(`Cannot update item with slug "${updatedItem.slug}" because the original could not be found.`)

          draftState.contentItems[itemIndex] = updatedItem
        }
      })
    }

    case REQUEST_CREATE_ITEMS:
    case REQUEST_DELETE_ITEMS:
    case REQUEST_READ_ITEMS:
    case REQUEST_UPDATE_ITEMS: {
      return state
    }

    case SET_CURRENT_ITEM: {
      return produce(state, draftState => {
        draftState.currentContentItem = payload
      })
    }

    case TOGGLE_NEEDS_KEY_ART_FILTER: {
      return produce(state, draftState => {
        draftState.needsKeyArtFilter = !draftState.needsKeyArtFilter
      })
    }

    case TOGGLE_SHOW_UNPUBLISHED_FILTER: {
      return produce(state, draftState => {
        draftState.showUnpublishedFilter = !draftState.showUnpublishedFilter
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
