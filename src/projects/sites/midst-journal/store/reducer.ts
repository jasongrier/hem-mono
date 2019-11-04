import { AnyAction } from 'redux'
import {
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,

  IState,
} from './types'

const poems = [
  {
    author: 'Angelo Colavita',
    authorId: 'angelo-colavita',
    poemId: 'angelo-colavita--a-shade-whiter',
    url: 'a-shade-whiter',
    title: 'A Shade Whiter',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    poemId: 'annelyse-gelman--alphabet-song',
    url: 'alphabet-song',
    title: 'Alphabet Song',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    poemId: 'annelyse-gelman--haiku',
    url: 'haiku',
    title: 'Haiku',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    poemId: 'annelyse-gelman--park',
    url: 'park',
    title: 'Park',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    poemId: 'annelyse-gelman--the-story',
    url: 'the-story',
    title: 'The Story',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    poemId: 'annelyse-gelman--watering-cows',
    url: 'watering-cows',
    title: 'Watering Cows',
  }, {
    author: 'Hedgie Choi',
    authorId: 'hedgie-choi',
    poemId: 'hedgie-choi--i-get-it-phases',
    url: 'i-get-it-phases',
    title: 'Untitled',
  }, {
    author: 'Veronica Martin',
    authorId: 'veronica-martin',
    poemId: 'veronica-martin--epilogue-in-summer',
    url: 'epilogue-in-summer',
    title: 'Epilogue in Summer',
  },
]

const initialState: IState = {
  mobileNavOpen: false,
  poems,
  processNoteOpen: false,
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
