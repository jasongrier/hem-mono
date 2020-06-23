import {
  ADMIN_APPLY_FILTER,
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

  Action,
  IContentItem,
} from './index'

const adminApplyFilter = (filter: string): Action => ({
  type: ADMIN_APPLY_FILTER,
  payload: filter,
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

const requestReadItems = (): Action => ({
  type: REQUEST_READ_ITEMS,
  payload: null,
})

const requestUpdateItems = (items: IContentItem[]): Action => ({
  type: REQUEST_UPDATE_ITEMS,
  payload: items,
})

const setCurrentItem = (item: IContentItem): Action => ({
  type: SET_CURRENT_ITEM,
  payload: item,
})

export {
  adminApplyFilter,
  clearItems,
  doCreateItems,
  doDeleteItems,
  doReadItems,
  doUpdateItems,
  requestCreateItems,
  requestDeleteItems,
  requestReadItems,
  requestUpdateItems,
  setCurrentItem,
}