import { AnyAction } from 'redux'

export interface IProductImage {
  alt: string
  src: string
}

export interface IContentItem {
  badgeText: string | null
  blurb: string
  date: string
  description: string
  featureList: string[]
  fixedPrice: number | null
  flexPriceMinimum: number | null
  hasFixedPrice: boolean
  id: string
  images: IProductImage[]
  tags: string[]
  name: string
  published: boolean
  soundCloudTrackId: string
  slug: string
  sticky: boolean
  type: string
  userSuggestedPrice: number
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

export { DetailPopUp, ProductTile } from './components'
