import {
  INDEX_RECEIVED,
  INDEX_REQUESTED,

  IArticle,
  Action,
} from './index'

const indexReceived = (articleIndexEntries: IArticle[]): Action => ({
  payload: articleIndexEntries,
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
