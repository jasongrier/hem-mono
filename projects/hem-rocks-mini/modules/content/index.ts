import { AnyAction } from 'redux'

export interface IProductImage {
  alt: string
  src: string
}

export interface IContentItem {
  blurb: string
  description: string
  featureList: string[]
  fixedPrice: number | null
  flexPriceMinimum: number | null
  hasFixedPrice: boolean
  id: string
  images: IProductImage[]
  tags: string[]
  name: string
  soundCloudTrackId: string
  slug: string
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
