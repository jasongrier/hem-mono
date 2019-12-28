import { AnyAction } from 'redux'

export interface IImage {
  alt: string
  tags: string[]
  url: string
}

export interface IArticle {
  blurb: string
  category: string
  dataUrl: string
  keyArtImage: IImage | null
  keyArtComponent: string | null
  keyArtComponentProps: any | null
  order: number,
  subCategory: string
  status: string
  tags: string[]
  title: string
  url: string
}

export interface IState {
  articles: IArticle[]
  requests: string[]
}

export const INDEX_RECEIVED = 'INDEX_RECEIVED'
export const INDEX_REQUESTED = 'INDEX_REQUESTED'

export interface IIndexReceived extends AnyAction {
  payload: { articles: IArticle[], pathToIndex: string }
  type: typeof INDEX_RECEIVED
}

export interface IIndexRequested extends AnyAction {
  payload: string
  type: typeof INDEX_REQUESTED
}

export type Action = IIndexReceived | IIndexRequested

export { indexRequested } from './actions'
export { ArticlesGrid, ArticleTile } from './components'
export { indexSaga } from './sagas'
export { reducer } from './reducer'
