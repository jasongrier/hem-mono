import { AnyAction } from 'redux'
import { IState } from './types'

const initialState: IState = {
  slSounds: [],
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
