import { AnyAction } from 'redux'

export interface IImage {
  alt: string
  src: string
}

export interface ITrack {
  attribution: string
  type: 'local', 'mixcloud', 'soundcloud'
  soundCloudTrackId: string | null
  soundCloudSecretToken: string | null
}

export interface IContentItem {
  acceptingDonations: boolean
  badgeText: string | null
  blurb: string
  date: string
  description: string
  fixedPrice: number | null
  flexPriceMinimum: number | null
  flexPriceRecommended: number | null
  images: IImage[]
  name: string
  nameWrapping: string | null
  published: boolean
  slug: string
  sticky: boolean
  tags: string[]
  tracks: ITrack[]
  type: string
  userSuggestedPrice: number | null
}

export interface IState {
  currentContentItem: IContentItem | null
  contentItems: IContentItem[]
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
  payload: Array<{ slug: string, update: Partial<IContentItem> }>
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
  AdminItem,
  AdminList,
  DetailPopUp,
  LaunchDetailPopupButton,
  MainContentBox,
  MainContentList,
} from './components'

export {
  getTracksFromContentItems,
} from './functions'
