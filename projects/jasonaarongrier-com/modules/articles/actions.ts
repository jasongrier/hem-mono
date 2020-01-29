import { AnyAction } from 'redux'
import {
  LOAD_ITEMS,

  ThunkResult,
} from './types'

const loadItems = (): ThunkResult<void> =>
  async (dispatch) => {
    const articlesList = await fetch('/static/data/index.json')
    dispatch({ type: LOAD_ITEMS, payload: null })
  }

export {
  loadItems,
}
