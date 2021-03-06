import {
  ADMIN_APPLY_FILTER,
  ADMIN_APPLY_SEARCH,
  CLEAR_ITEMS,
  DO_CREATE_ITEMS,
  DO_DELETE_ITEMS,
  DO_READ_CHUNK,
  DO_READ_ITEMS,
  DO_UPDATE_ITEMS,
  REQUEST_CREATE_ITEMS,
  REQUEST_DELETE_ITEMS,
  REQUEST_READ_CHUNK,
  REQUEST_READ_ITEMS,
  REQUEST_UPDATE_ITEMS,
  SET_ADMIN_SEARCHABLE_FIELD,
  SET_CURRENT_ITEM,
  SET_CURRENT_ITEMS,
  SET_CURRENT_LANDING_PAGE,
  SET_CURRENT_PAGE,
  SET_CURRENT_PROJECT,
  TOGGLE_NEEDS_KEY_ART_FILTER,
  TOGGLE_SHOW_UNPUBLISHED_FILTER,
  TOGGLE_STICKY_FILTER,

  Action,
  IContentItem,
} from './index'

const adminApplyFilter = (filter: string): Action => ({
  type: ADMIN_APPLY_FILTER,
  payload: filter,
})

const adminApplySearch = (search: string): Action => ({
  type: ADMIN_APPLY_SEARCH,
  payload: search,
})

const clearItems = (): Action => ({
  type: CLEAR_ITEMS,
  payload: null,
})

const doCreateItems = (items: IContentItem[]): Action => ({
  type: DO_CREATE_ITEMS,
  payload: items,
})

const doDeleteItems = (itemIds: string[]): Action => ({
  type: DO_DELETE_ITEMS,
  payload: itemIds,
})

const doReadChunk = (chunkName: string, contentItems: IContentItem[]): Action => ({
  type: DO_READ_CHUNK,
  payload: { chunkName, contentItems },
})

const doReadItems = (items: IContentItem[]): Action => ({
  type: DO_READ_ITEMS,
  payload: items,
})

const doUpdateItems = (items: IContentItem[]): Action => ({
  type: DO_UPDATE_ITEMS,
  payload: items,
})

const requestCreateItems = (items: IContentItem[]): Action => ({
  type: REQUEST_CREATE_ITEMS,
  payload: items,
})

const requestDeleteItems = (itemIds: string[]): Action => ({
  type: REQUEST_DELETE_ITEMS,
  payload: itemIds,
})

const requestReadChunk = (chunkName: string): Action => ({
  type: REQUEST_READ_CHUNK,
  payload: chunkName,
})

const requestReadItems = (): Action => ({
  type: REQUEST_READ_ITEMS,
  payload: null,
})

const requestUpdateItems = (items: IContentItem[]): Action => ({
  type: REQUEST_UPDATE_ITEMS,
  payload: items,
})

const setAdminSearchableField = (field: string): Action => ({
  type: SET_ADMIN_SEARCHABLE_FIELD,
  payload: field,
})

const setCurrentItem = (item: IContentItem): Action => ({
  type: SET_CURRENT_ITEM,
  payload: item,
})

const setCurrentItems = (items: IContentItem[]): Action => ({
  type: SET_CURRENT_ITEMS,
  payload: items,
})

const setCurrentLandingPage = (landingPageName: string | null): Action => ({
  type: SET_CURRENT_LANDING_PAGE,
  payload: landingPageName,
})

const setCurrentPage = (page: number): Action => ({
  type: SET_CURRENT_PAGE,
  payload: page,
})

const setCurrentProject = (project: string | null): Action => ({
  type: SET_CURRENT_PROJECT,
  payload: project,
})

const toggleNeedsKeyArtFilter = (): Action => ({
  type: TOGGLE_NEEDS_KEY_ART_FILTER,
  payload: null,
})

const toggleShowUnpublishedFilter = (): Action => ({
  type: TOGGLE_SHOW_UNPUBLISHED_FILTER,
  payload: null,
})

const toggleStickyFilter = (): Action => ({
  type: TOGGLE_STICKY_FILTER,
  payload: null,
})

export {
  adminApplyFilter,
  adminApplySearch,
  clearItems,
  doCreateItems,
  doDeleteItems,
  doReadChunk,
  doReadItems,
  doUpdateItems,
  requestCreateItems,
  requestDeleteItems,
  requestReadChunk,
  requestReadItems,
  requestUpdateItems,
  setAdminSearchableField,
  setCurrentItem,
  setCurrentItems,
  setCurrentLandingPage,
  setCurrentPage,
  setCurrentProject,
  toggleNeedsKeyArtFilter,
  toggleShowUnpublishedFilter,
  toggleStickyFilter,
}
