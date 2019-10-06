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
      slug: 'a-shade-whiter-1',
      title: 'This Is the Title of a Poem',
      author: 'Ryan Paradiso',
    },
    {
      slug: 'pool-1',
      title: 'Two Poems',
      author: 'Zachary Schomburg',
    },
    {
      slug: 'prosperity-1',
      title: 'Poem Title',
      author: 'Matthew Zapruder',
    },
    {
      slug: 'alphabet-song-1',
      title: 'A Name of Some Poem by Sarah',
      author: 'Sarah Matthes',
    },
    {
      slug: 'prosperity',
      title: 'A New Poem',
      author: 'Danniel Schoonebeek',
    },
    {
      slug: 'alphabet-song',
      title: 'Something-or-Other',
      author: 'Anis Mojgani',
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
