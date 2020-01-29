import { AnyAction } from 'redux'
import { IState } from './types'
import articles from '../data'

const initialState: IState = {
  items: [],
}

const reducer = (
  state: IState = initialState,
  { type }: AnyAction,
): IState => {
  switch (type) {
    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
