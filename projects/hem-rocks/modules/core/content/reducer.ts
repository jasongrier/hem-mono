import { AnyAction } from 'redux'
import produce from 'immer'
import { uniqBy, uniq } from 'lodash'
import {
  ADMIN_APPLY_FILTER,
  ADMIN_APPLY_SEARCH,
  DO_CREATE_ITEMS,
  DO_DELETE_ITEMS,
  DO_READ_CHUNK,
  DO_READ_ITEMS,
  DO_UPDATE_ITEMS,
  REQUEST_CREATE_ITEMS,
  REQUEST_DELETE_ITEMS,
  REQUEST_READ_ITEMS,
  REQUEST_UPDATE_ITEMS,
  SET_ADMIN_SEARCHABLE_FIELD,
  SET_CURRENT_ITEM,
  SET_CURRENT_ITEMS,
  SET_CURRENT_LANDING_PAGE,
  SET_CURRENT_PAGE,
  TOGGLE_NEEDS_KEY_ART_FILTER,
  TOGGLE_SHOW_UNPUBLISHED_FILTER,
  TOGGLE_STICKY_FILTER,

  IState,
  IContentItem,
  REQUEST_READ_CHUNK,
  SET_CURRENT_PROJECT,
} from './index'
import { applyPaginationAndFiltering, getContentItemById } from './functions'

declare const window: any

const initialState: IState = {
  adminFilterApplied: 'all',
  adminSearchableField: 'tags',
  adminSearchApplied: '',
  adminSearchExact: false,
  chunkLog: [],
  contentItems: [],
  currentContentItem: null,
  currentContentItems: [],
  currentProject: null,
  currentLandingPage: undefined,
  needsKeyArtFilter: false,
  page: 1,
  pageContentItems: [],
  showUnpublishedFilter: false,
  stickyFilter: false,
  unpaginatedItemCount: 0,
}

const reducer = (
  state: IState = initialState,
  { payload, type }: AnyAction,
): IState => {
  switch (type) {
    case ADMIN_APPLY_FILTER: {
      return produce(state, draftState => {
        draftState.adminFilterApplied = payload
        const { unpaginatedItemCount, pageContentItems } = applyPaginationAndFiltering(draftState)
        draftState.unpaginatedItemCount = unpaginatedItemCount
        draftState.pageContentItems = pageContentItems
      })
    }

    case ADMIN_APPLY_SEARCH: {
      return produce(state, draftState => {
        const { unpaginatedItemCount, pageContentItems } = applyPaginationAndFiltering(draftState)

        draftState.adminSearchApplied = payload
        draftState.unpaginatedItemCount = unpaginatedItemCount
        draftState.pageContentItems = pageContentItems
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

    case DO_READ_CHUNK: {
      return produce(state, draftState => {
        draftState.chunkLog = uniq(draftState.chunkLog.concat([payload.chunkName]))

        for (const contentItem of payload.contentItems) {
          if (!getContentItemById(draftState.contentItems, contentItem.id)) {
            draftState.contentItems.push(contentItem)
          }
        }
      })
    }

    case DO_READ_ITEMS: {
      return produce(state, draftState => {
        draftState.contentItems = payload
        const { unpaginatedItemCount, pageContentItems } = applyPaginationAndFiltering(draftState)
        draftState.unpaginatedItemCount = unpaginatedItemCount
        draftState.pageContentItems = pageContentItems
      })
    }

    case DO_UPDATE_ITEMS: {
      return produce(state, draftState => {
        for (const updatedItem of payload) {

          const itemIndex = draftState.contentItems.findIndex(
            item => item.id === updatedItem.id
          )

          if (itemIndex < 0) throw new Error(`Cannot update item with slug "${updatedItem.slug}" because the original could not be found.`)

          draftState.contentItems[itemIndex] = updatedItem
        }
      })
    }

    case REQUEST_CREATE_ITEMS:
    case REQUEST_DELETE_ITEMS:
    case REQUEST_READ_CHUNK:
    case REQUEST_READ_ITEMS:
    case REQUEST_UPDATE_ITEMS: {
      return state
    }

    case SET_ADMIN_SEARCHABLE_FIELD: {
      return produce(state, draftState => {
        draftState.adminSearchableField = payload
        const { unpaginatedItemCount, pageContentItems } = applyPaginationAndFiltering(draftState)
        draftState.unpaginatedItemCount = unpaginatedItemCount
        draftState.pageContentItems = pageContentItems
      })
    }

    case SET_CURRENT_ITEM: {
      return produce(state, draftState => {
        draftState.currentContentItem = payload
      })
    }

    case SET_CURRENT_ITEMS: {
      return produce(state, draftState => {
        draftState.currentContentItems = payload
      })
    }

    case SET_CURRENT_LANDING_PAGE: {
      return produce(state, draftState => {
        draftState.currentLandingPage = payload
      })
    }

    case SET_CURRENT_PAGE: {
      return produce(state, draftState => {
        draftState.page = payload
        const { unpaginatedItemCount, pageContentItems } = applyPaginationAndFiltering(draftState)
        draftState.unpaginatedItemCount = unpaginatedItemCount
        draftState.pageContentItems = pageContentItems
      })
    }

    case SET_CURRENT_PROJECT: {
      return produce(state, draftState => {
        draftState.currentProject = payload
      })
    }

    case TOGGLE_NEEDS_KEY_ART_FILTER: {
      return produce(state, draftState => {
        draftState.needsKeyArtFilter = !draftState.needsKeyArtFilter
        const { unpaginatedItemCount, pageContentItems } = applyPaginationAndFiltering(draftState)
        draftState.unpaginatedItemCount = unpaginatedItemCount
        draftState.pageContentItems = pageContentItems
      })
    }

    case TOGGLE_SHOW_UNPUBLISHED_FILTER: {
      return produce(state, draftState => {
        draftState.showUnpublishedFilter = !draftState.showUnpublishedFilter
        const { unpaginatedItemCount, pageContentItems } = applyPaginationAndFiltering(draftState)
        draftState.unpaginatedItemCount = unpaginatedItemCount
        draftState.pageContentItems = pageContentItems
      })
    }

    case TOGGLE_STICKY_FILTER: {
      return produce(state, draftState => {
        draftState.stickyFilter = !draftState.stickyFilter
        const { unpaginatedItemCount, pageContentItems } = applyPaginationAndFiltering(draftState)
        draftState.unpaginatedItemCount = unpaginatedItemCount
        draftState.pageContentItems = pageContentItems
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
