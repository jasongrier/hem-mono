import { AnyAction } from 'redux'
import {
  SET_MOBILE_NAV_OPEN,

  IState,
} from './types'

const initialState: IState = {
  mobileNavOpen: false
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SET_MOBILE_NAV_OPEN:
      return { ...state, mobileNavOpen: payload }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
