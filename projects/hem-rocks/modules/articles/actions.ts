import {
  INDEX_RECEIVED,
  INDEX_REQUESTED,

  IArticle,
  Action,
} from './index'

const indexReceived = (articles: IArticle[], pathToIndex): Action => ({
  payload: { articles, pathToIndex },
  type: INDEX_RECEIVED,
})

const indexRequested = (pathToIndex: string): Action => ({
  type: INDEX_REQUESTED,
  payload: pathToIndex,
})

export {
  indexReceived,
  indexRequested,
}
