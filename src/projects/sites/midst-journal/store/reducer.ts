import { AnyAction } from 'redux'
import produce from 'immer'
import {
  LOAD_POEM_DATA,
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,

  IState,
} from './types'

const poems = [
  {
    author: 'Angelo Colavita',
    authorId: 'angelo-colavita',
    data: null,
    poemId: 'angelo-colavita--a-shade-whiter',
    processNote: null,
    url: 'a-shade-whiter',
    title: 'A Shade Whiter',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    data: null,
    poemId: 'annelyse-gelman--alphabet-song',
    processNote: null,
    url: 'alphabet-song',
    title: 'Alphabet Song',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    data: null,
    poemId: 'annelyse-gelman--haiku',
    processNote: null,
    url: 'haiku',
    title: 'Haiku',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    data: null,
    poemId: 'annelyse-gelman--park',
    processNote: null,
    url: 'park',
    title: 'Park',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    data: null,
    poemId: 'annelyse-gelman--the-story',
    processNote: null,
    url: 'the-story',
    title: 'The Story',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    data: null,
    poemId: 'annelyse-gelman--watering-cows',
    processNote: null,
    url: 'watering-cows',
    title: 'Watering Cows',
  }, {
    author: 'Hedgie Choi',
    authorId: 'hedgie-choi',
    data: null,
    poemId: 'hedgie-choi--i-get-it-phases',
    processNote: null,
    url: 'i-get-it-phases',
    title: 'Untitled',
  }, {
    author: 'Veronica Martin',
    authorId: 'veronica-martin',
    data: null,
    poemId: 'veronica-martin--epilogue-in-summer',
    processNote: null,
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
  { type, payload }: AnyAction, // TODO: Should be Action from `../types.ts`
): IState => {
  switch (type) {
    case LOAD_POEM_DATA:
      const { poemId, data, processNote } = payload
      return produce(state, draftState => {
        const poem = draftState.poems.find(poem => poem.poemId === poemId)
        if (poem) {
          poem.data = data
          poem.processNote = processNote
        }
      })

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
