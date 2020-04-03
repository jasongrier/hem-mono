import { AnyAction } from 'redux'
import { IState } from './index'

const initialState: IState = {
  products: []
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
