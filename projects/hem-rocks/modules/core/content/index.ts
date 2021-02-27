import { AnyAction } from 'redux'

export interface IContentItem {
  acceptingDonations: boolean
  aside: string
  attachments: string
  attachmentTo: string
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
  duration: string
  externalLinkText: string
  externalLinkUrl: string
  fileSize: string
  fixedPrice: string
  flexPriceChoices: string
  flexPriceMinimum: string
  flexPriceRecommended: string
  hasFixedPrice: boolean
  id: string
  isDigitalProduct: boolean
  isPhysicalProduct: boolean
  keyArt: string
  keyArtFullPath: string
  note: string
  order: string
  physicalFormats: string
  preview: boolean
  project: string
  properties: string
  published: boolean
  relatedContent: string
  relatedContentLink: string
  releaseDate: string
  releasePhase: string
  secondaryAttribution: string
  secondaryAttributionLink: string
  secondaryTitle: string
  slug: string
  sticky: boolean
  tags: string
  title: string
  titleWrapping: string
  type: string
}

export interface IIndexEntry {
  date: string
  slug: string
}

export interface IState {
  adminFilterApplied: string
  adminSearchableField: keyof IContentItem
  adminSearchApplied: string
  adminSearchExact: boolean
  chunkLog: string[]
  contentItems: IContentItem[]
  currentContentItem: IContentItem | null
  currentContentItems: IContentItem[]
  currentProject: string
  needsKeyArtFilter: boolean
  page: number,
  pageContentItems: IContentItem[],
  showUnpublishedFilter: boolean
  stickyFilter: boolean
  unpaginatedItemCount: number,
}

export const fieldTypes: IContentItem = {
  acceptingDonations: false,
  aside: 'textarea',
  attachments: 'textarea',
  attachmentTo: 'textarea',
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
  duration: 'text',
  externalLinkText: 'text',
  externalLinkUrl: 'text',
  fileSize: 'text',
  fixedPrice: 'text',
  flexPriceChoices: 'text',
  flexPriceMinimum: 'text',
  flexPriceRecommended: 'text',
  hasFixedPrice: false,
  id: 'text',
  isDigitalProduct: false,
  isPhysicalProduct: false,
  keyArt: 'text',
  keyArtFullPath: 'text',
  note: 'textarea',
  order: 'text',
  physicalFormats: 'textarea',
  preview: false,
  project: 'text',
  properties: 'text',
  published: false,
  relatedContent: 'text',
  relatedContentLink: 'text',
  releaseDate: 'text',
  releasePhase: 'text',
  secondaryAttribution: 'text',
  secondaryAttributionLink: 'text',
  secondaryTitle: 'text',
  slug: 'text',
  sticky: false,
  tags: 'text',
  title: 'text',
  titleWrapping: 'text',
  type: 'text',
}

export const categories = [
  'apps',
  'articles',
  'artists',
  'assets-vollmer',
  'assets',
  'blog',
  'code',
  'editions',
  'faqs',
  'general-content',
  'heroines',
  'image-gallery',
  'images',
  'label',
  'lists',
  'merch',
  'mix',
  'news',
  'notes',
  'playlists',
  'press-clippings',
  'press-kits',
  'press-releases',
  'program',
  'projects',
  'recipes',
  'reminders',
  'settings',
  'site-texts',
  'sound-library',
  'stock-photos',
  'todos',
  'tracks',
  'tutorial',
  'user-guides',
  'video',
]

export const projects = [
  'hem.rocks',
  'berlinstockphotos.com',
  'jag.rip',
  'midst.press',
]

export const ADMIN_APPLY_FILTER = 'ADMIN_APPLY_FILTER'
export const ADMIN_APPLY_SEARCH = 'ADMIN_APPLY_SEARCH'
export const CLEAR_ITEMS = 'CLEAR_ITEMS'
export const DO_CREATE_ITEMS = 'DO_CREATE_ITEMS'
export const DO_DELETE_ITEMS = 'DO_DELETE_ITEMS'
export const DO_READ_CHUNK = 'DO_READ_CHUNK'
export const DO_READ_ITEMS = 'DO_READ_ITEMS'
export const DO_UPDATE_ITEMS = 'DO_UPDATE_ITEMS'
export const REQUEST_CREATE_ITEMS = 'REQUEST_CREATE_ITEMS'
export const REQUEST_DELETE_ITEMS = 'REQUEST_DELETE_ITEMS'
export const REQUEST_READ_CHUNK = 'REQUEST_READ_CHUNK'
export const REQUEST_READ_ITEMS = 'REQUEST_READ_ITEMS'
export const REQUEST_UPDATE_ITEMS = 'REQUEST_UPDATE_ITEMS'
export const SET_ADMIN_SEARCHABLE_FIELD = 'SET_ADMIN_SEARCHABLE_FIELD'
export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM'
export const SET_CURRENT_ITEMS = 'SET_CURRENT_ITEMS'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'
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

export interface IDoReadChunk extends AnyAction {
  type: typeof DO_READ_CHUNK
  payload: { chunkName: string, contentItems: IContentItem[] }
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

export interface IRequestReadChunk extends AnyAction {
  type: typeof REQUEST_READ_CHUNK
  payload: string
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

export interface ISetAdminSearchableField extends AnyAction {
  type: typeof SET_ADMIN_SEARCHABLE_FIELD
  payload: string
}

export interface ISetCurrentItems extends AnyAction {
  type: typeof SET_CURRENT_ITEMS
  payload: IContentItem[]
}

export interface ISetCurrentPage extends AnyAction {
  type: typeof SET_CURRENT_PAGE
  payload: number
}


export interface ISetCurrentProject extends AnyAction {
  type: typeof SET_CURRENT_PROJECT
  payload: string
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
  | IDoReadChunk
  | IDoReadItems
  | IDoUpdateItems
  | IRequestCreateItems
  | IRequestDeleteItems
  | IRequestReadChunk
  | IRequestReadItems
  | IRequestUpdateItems
  | ISetAdminSearchableField
  | ISetCurrentItem
  | ISetCurrentItems
  | ISetCurrentPage
  | ISetCurrentProject
  | IToggleNeedsKeyArtFilter
  | IToggleShowUnpublishedFilter
  | IToggleStickyFilter

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
  setCurrentPage,
  setCurrentProject,
  toggleNeedsKeyArtFilter,
  toggleShowUnpublishedFilter,
  toggleStickyFilter,
} from './actions'

export { reducer as contentReducer } from './reducer'

export {
  AdminItem,
  AdminItemOrdering,
  AdminList,
  AdminManualTaskRunner,
  AdminProgram,
  AdminProgramMonth,
  AdminProgramNewItemForm,
  AdminReconcilePlaylists,
  AdminSettings,
  DetailPopUp,
  LaunchDetailPopupButton,
  MainContentBox,
  MainContentBoxActions,
  MainContentList,
} from './components'

export {
  addProperty,
  addTag,
  addTerm,
  compressIndex,
  compressIndexKeys,
  contentItemToTrack,
  fieldIsSerialized,
  generateChunks,
  getContentItemByField,
  getContentItemById,
  getContentItemBySlug,
  getContentItemsByTag,
  getContentItemsFromList,
  getContentItemsFromRawList,
  getOrder,
  getProperties,
  getTags,
  getTerms,
  hasCategory,
  hasProperty,
  hasTag,
  hasTerm,
  modelize,
  orderSortFnFact,
  parseSerializedOrderFieldValue,
  readAllItems,
  removeProperty,
  removeTag,
  removeTerm,
  selectableCategories,
  smartSlugify,
  uncompressItem,
  uniqueSlug,
  updateSerializedOrderFieldValue,
  validateCompressionMap,
  getPropertiesInCollection,
  getTagsInCollection,
} from './functions'

export {
  createItemsSaga,
  deleteItemsSaga,
  readChunkSaga,
  readItemsSaga,
  updateItemsSaga,
} from './sagas'
