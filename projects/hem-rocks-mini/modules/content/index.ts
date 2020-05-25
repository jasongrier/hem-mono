import { AnyAction } from 'redux'

export interface IContentItem {
  acceptingDonations: boolean
  attribution: string
  badgeText: string
  blurb: string
  date: string
  description: string
  fixedPrice: string
  flexPriceMinimum: string
  flexPriceRecommended: string
  hasFixedPrice: boolean
  secondaryTitle: string
  title: string
  titleWrapping: string
  published: boolean
  slug: string
  sticky: boolean
  tags: string
  trackId: string
  type: string
}

export interface IState {
  currentContentItem: IContentItem | null
  contentItems: IContentItem[]
}

export const fieldTypes: IContentItem = {
  acceptingDonations: false,
  attribution: 'text',
  badgeText: 'text',
  blurb: 'textarea',
  date: 'text',
  description: 'textarea',
  fixedPrice: 'text',
  flexPriceMinimum: 'text',
  flexPriceRecommended: 'text',
  hasFixedPrice: false,
  secondaryTitle: 'text',
  title: 'text',
  titleWrapping: 'text',
  published: false,
  slug: 'text',
  sticky: false,
  tags: 'text',
  trackId: 'text',
  type: 'text',
}

export const CLEAR_ITEMS = 'CLEAR_ITEMS'
export const DO_CREATE_ITEMS = 'DO_CREATE_ITEMS'
export const DO_DELETE_ITEMS = 'DO_DELETE_ITEMS'
export const DO_READ_ITEMS = 'DO_READ_ITEMS'
export const DO_UPDATE_ITEMS = 'DO_UPDATE_ITEMS'
export const REQUEST_CREATE_ITEMS = 'REQUEST_CREATE_ITEMS'
export const REQUEST_DELETE_ITEMS = 'REQUEST_DELETE_ITEMS'
export const REQUEST_READ_ITEMS = 'REQUEST_READ_ITEMS'
export const REQUEST_UPDATE_ITEMS = 'REQUEST_UPDATE_ITEMS'
export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM'

export interface IClearItems extends AnyAction {
  type: typeof CLEAR_ITEMS
  payload: null
}

export interface IDoCreateItems extends AnyAction {
  type: typeof DO_CREATE_ITEMS
  payload: IContentItem[]
}

export interface IDoDeleteItems extends AnyAction {
  type: typeof DO_DELETE_ITEMS
  payload: string[]
}

export interface IDoReadItems extends AnyAction {
  type: typeof DO_READ_ITEMS
  payload: IContentItem[]
}

export interface IDoUpdateItems extends AnyAction {
  type: typeof DO_UPDATE_ITEMS
  payload: IContentItem[]
}

export interface IRequestCreateItems extends AnyAction {
  type: typeof REQUEST_CREATE_ITEMS
  payload: IContentItem[]
}

export interface IRequestDeleteItems extends AnyAction {
  type: typeof REQUEST_DELETE_ITEMS
  payload: string[]
}

export interface IRequestReadItems extends AnyAction {
  type: typeof REQUEST_READ_ITEMS
  payload: { page: number, size: number }
}

export interface IRequestUpdateItems extends AnyAction {
  type: typeof REQUEST_UPDATE_ITEMS
  payload: IContentItem[]
}

export interface ISetCurrentItem extends AnyAction {
  type: typeof SET_CURRENT_ITEM
  payload: IContentItem
}

export type Action =
  IClearItems
  | IDoCreateItems
  | IDoDeleteItems
  | IDoReadItems
  | IDoUpdateItems
  | IRequestCreateItems
  | IRequestDeleteItems
  | IRequestReadItems
  | IRequestUpdateItems
  | ISetCurrentItem

export {
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
} from './actions'

export { reducer as contentReducer } from './reducer'

export {
  AdminManualTaskRunner,
  AdminItem,
  AdminList,
  DetailPopUp,
  LaunchDetailPopupButton,
  MainContentBox,
  MainContentList,
} from './components'

export {
  getTracksFromContentItems,
  modelize,
} from './functions'

export {
  createItemsSaga,
  deleteItemsSaga,
  readItemsSaga,
  updateItemsSaga,
} from './sagas'
