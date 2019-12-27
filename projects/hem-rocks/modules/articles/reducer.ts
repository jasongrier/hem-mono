import { AnyAction } from 'redux'
import { formatArticleData } from './functions'
import produce from 'immer'
import {
  INDEX_RECEIVED,
  INDEX_REQUESTED,

  IState,
} from './index'

const initialState: IState = {
  articles: [],
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case INDEX_REQUESTED: {
      return state
    }

    case INDEX_RECEIVED: {
      return produce(state, draftState => {
        const articles = payload.map(formatArticleData)
        draftState.articles = draftState.articles.concat(articles)
      })
    }

    default: {
      return state
    }
  }
}

export {
  initialState,
  reducer,
}
