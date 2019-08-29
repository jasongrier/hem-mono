import { AnyAction } from 'redux'
import {
  SET_MOBILE_NAV_OPEN,

  IState,
} from './types'

const initialState: IState = {
  mobileNavOpen: false,
  poems: [
    {
      slug: 'a-shade-whiter',
      title: 'A Shade Whiter',
      author: 'Angelo Colavita',
    },
    {
      slug: 'poem-b',
      title: 'Poem B',
      author: 'Author B',
    },
    {
      slug: 'poem-c',
      title: 'Poem C',
      author: 'Author C',
    },
  ]
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
