import { AnyAction } from 'redux'
import {
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,

  IState,
} from './types'

const initialState: IState = {
  mobileNavOpen: false,
  processNoteOpen: false,
  poems: [
    {
      slug: 'a-shade-whiter',
      title: 'A Shade Whiter',
      author: 'Angelo Colavita',
    },
    {
      slug: 'pool',
      title: 'Pool',
      author: 'Annelyse Gelman',
    },
    {
      slug: 'prosperity',
      title: 'Prosperity',
      author: 'Annelyse Gelman',
    },
    {
      slug: 'alphabet-song',
      title: 'Alphabet Song',
      author: 'Annelyse Gelman',
    }
  ]
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case SET_MOBILE_NAV_OPEN:
      return { ...state, mobileNavOpen: payload }

    case SET_PROCESS_NOTE_OPEN:
      return { ...state, processNoteOpen: payload }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
