import { AnyAction } from 'redux'

export interface IProductImage {
  alt: string
  src: string
}

export interface IContentItem {
  acceptingDonations: boolean
  badgeText: string | null
  blurb: string
  date: string
  description: string
  featureList: string[]
  fixedPrice: number | null
  flexPriceMinimum: number | null
  flexPriceRecommended: number | null
  hasFixedPrice: boolean
  id: string
  images: IProductImage[]
  tags: string[]
  name: string
  published: boolean
  soundCloudTrackId: string | null
  soundCloudSecretToken: string | null
  slug: string
  sticky: boolean
  trackAttribution: string
  type: string
  userSuggestedPrice: number | null
  videos: string[]
}

export interface IState {
  currentContentItem: IContentItem | null
  contentItems: IContentItem[]
}

export const SET_CURRENT_CONTENT_ITEM = 'SET_CURRENT_CONTENT_ITEM'

export interface ISetCurrentContentItem extends AnyAction {
  type: typeof SET_CURRENT_CONTENT_ITEM
  payload: IContentItem
}

export type Action = ISetCurrentContentItem

export { setCurrentContentItem } from './actions'

export { reducer as contentReducer } from './reducer'

export {
  DetailPopUp,
  LaunchDetailPopupButton,
  MainContentBox,
  MainContentList,
  PostDownloadPopup,
} from './components'

export {
  getTracksFromContentItems,
} from './functions'
