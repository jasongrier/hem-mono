import { AnyAction } from 'redux'

export interface IContentItem {
  acceptingDonations: boolean
  aside: string
  attribution: string
  attributionLink: string
  audioFilename: string
  badgeText: string
  blurb: string
  category: string
  date: string
  description: string
  displayCategory: string
  downloadFile: string
  externalLinkText: string
  externalLinkUrl: string
  fixedPrice: string
  flexPriceMinimum: string
  flexPriceRecommended: string
  hasFixedPrice: boolean
  id: string
  isDigitalProduct: boolean
  isPhysicalProduct: boolean
  keyArt: string
  order: string
  physicalFormats: string
  preview: boolean
  published: boolean
  relatedContent: string
  relatedContentLink: string
  releasePhase: string
  secondaryAttribution: string
  secondaryAttributionLink: string
  secondaryTitle: string
  slug: string
  sticky: boolean
  tags: string
  title: string
  titleWrapping: string
  trackSlugs: string
  type: string
}

export interface IIndexEntry {
  date: string
  slug: string
}

export interface IState {
  adminFilterApplied: string
  adminSearchApplied: string
  currentContentItem: IContentItem | null
  currentContentItems: IContentItem[]
  contentItems: IContentItem[]
  needsKeyArtFilter: boolean
  showUnpublishedFilter: boolean
  stickyFilter: boolean
}

export const fieldTypes: IContentItem = {
  acceptingDonations: false,
  aside: 'textarea',
  attribution: 'text',
  attributionLink: 'text',
  audioFilename: 'text',
  badgeText: 'text',
  blurb: 'textarea',
  category: 'text',
  date: 'text',
  description: 'textarea',
  displayCategory: 'text',
  downloadFile: 'text',
  externalLinkText: 'text',
  externalLinkUrl: 'text',
  fixedPrice: 'text',
  flexPriceMinimum: 'text',
  flexPriceRecommended: 'text',
  hasFixedPrice: false,
  id: 'text',
  isDigitalProduct: false,
  isPhysicalProduct: false,
  keyArt: 'text',
  order: 'text',
  physicalFormats: 'textarea',
  preview: false,
  published: false,
  relatedContent: 'text',
  relatedContentLink: 'text',
  releasePhase: 'text',
  secondaryAttribution: 'text',
  secondaryAttributionLink: 'text',
  secondaryTitle: 'text',
  slug: 'text',
  sticky: false,
  tags: 'text',
  title: 'text',
  titleWrapping: 'text',
  trackSlugs: 'textarea',
  type: 'text',
}

export const ADMIN_APPLY_FILTER = 'ADMIN_APPLY_FILTER'
export const ADMIN_APPLY_SEARCH = 'ADMIN_APPLY_SEARCH'
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
export const SET_CURRENT_ITEMS = 'SET_CURRENT_ITEMS'
export const TOGGLE_NEEDS_KEY_ART_FILTER = 'TOGGLE_NEEDS_KEY_ART_FILTER'
export const TOGGLE_SHOW_UNPUBLISHED_FILTER = 'TOGGLE_SHOW_UNPUBLISHED_FILTER'
export const TOGGLE_STICKY_FILTER = 'TOGGLE_STICKY_FILTER'

export interface IAdminApplyFilter extends AnyAction {
  type: typeof ADMIN_APPLY_FILTER
  payload: string
}

export interface IAdminApplySearch extends AnyAction {
  type: typeof ADMIN_APPLY_SEARCH
  payload: string
}

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
  payload: null
}

export interface IRequestUpdateItems extends AnyAction {
  type: typeof REQUEST_UPDATE_ITEMS
  payload: IContentItem[]
}

export interface ISetCurrentItem extends AnyAction {
  type: typeof SET_CURRENT_ITEM
  payload: IContentItem
}

export interface ISetCurrentItems extends AnyAction {
  type: typeof SET_CURRENT_ITEMS
  payload: IContentItem[]
}

export interface IToggleNeedsKeyArtFilter extends AnyAction {
  type: typeof TOGGLE_NEEDS_KEY_ART_FILTER
  payload: null
}

export interface IToggleShowUnpublishedFilter extends AnyAction {
  type: typeof TOGGLE_SHOW_UNPUBLISHED_FILTER
  payload: null
}

export interface IToggleStickyFilter extends AnyAction {
  type: typeof TOGGLE_STICKY_FILTER
  payload: null
}

export type Action =
  IAdminApplyFilter
  | IAdminApplySearch
  | IClearItems
  | IDoCreateItems
  | IDoDeleteItems
  | IDoReadItems
  | IDoUpdateItems
  | IRequestCreateItems
  | IRequestDeleteItems
  | IRequestReadItems
  | IRequestUpdateItems
  | ISetCurrentItem
  | ISetCurrentItems
  | IToggleNeedsKeyArtFilter
  | IToggleShowUnpublishedFilter
  | IToggleStickyFilter

export {
  adminApplyFilter,
  adminApplySearch,
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
  setCurrentItems,
  toggleNeedsKeyArtFilter,
  toggleShowUnpublishedFilter,
  toggleStickyFilter,
} from './actions'

export { reducer as contentReducer } from './reducer'

export {
  AdminManualTaskRunner,
  AdminItem,
  AdminList,
  AdminSettings,
  DetailPopUp,
  LaunchDetailPopupButton,
  MainContentBox,
  MainContentList,
} from './components'

export {
  compressIndex,
  compressIndexKeys,
  contentItemToTrack,
  hasCategory,
  hasTag,
  getContentItemByField,
  getContentItemBySlug,
  getContentItemsByTag,
  getContentItemsFromList,
  getContentItemsFromRawList,
  modelize,
  uncompressItem,
  validateCompressionMap
} from './functions'

export {
  createItemsSaga,
  deleteItemsSaga,
  readItemsSaga,
  updateItemsSaga,
} from './sagas'
