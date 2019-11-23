import { AnyAction } from 'redux'
import produce from 'immer'
import {
  LOAD_POEM_DATA,
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,

  IState,
} from './types'

// const poems = [
//   {
//     author: 'Angelo Colavita',
//     authorId: 'angelo-colavita',
//     data: null,
//     poemId: 'angelo-colavita--a-shade-whiter',
//     loaded: false,
//     processNote: '',
//     url: 'a-shade-whiter',
//     title: 'A Shade Whiter',
//   }, {
//     author: 'Annelyse Gelman',
//     authorId: 'annelyse-gelman',
//     data: null,
//     poemId: 'annelyse-gelman--alphabet-song',
//     loaded: false,
//     processNote: '',
//     url: 'alphabet-song',
//     title: 'Alphabet Song',
//   }, {
//     author: 'Annelyse Gelman',
//     authorId: 'annelyse-gelman',
//     data: null,
//     poemId: 'annelyse-gelman--haiku',
//     loaded: false,
//     processNote: '',
//     url: 'haiku',
//     title: 'Haiku',
//   }, {
//     author: 'Annelyse Gelman',
//     authorId: 'annelyse-gelman',
//     data: null,
//     poemId: 'annelyse-gelman--park',
//     loaded: false,
//     processNote: '',
//     url: 'park',
//     title: 'Park',
//   }, {
//     author: 'Annelyse Gelman',
//     authorId: 'annelyse-gelman',
//     data: null,
//     poemId: 'annelyse-gelman--the-story',
//     loaded: false,
//     processNote: '',
//     url: 'the-story',
//     title: 'The Story',
//   }, {
//     author: 'Annelyse Gelman',
//     authorId: 'annelyse-gelman',
//     data: null,
//     poemId: 'annelyse-gelman--watering-cows',
//     loaded: false,
//     processNote: '',
//     url: 'watering-cows',
//     title: 'Watering Cows',
//   }, {
//     author: 'Hedgie Choi',
//     authorId: 'hedgie-choi',
//     data: null,
//     poemId: 'hedgie-choi--i-get-it-phases',
//     loaded: false,
//     processNote: '',
//     url: 'i-get-it-phases',
//     title: 'Untitled',
//   }, {
//     author: 'Veronica Martin',
//     authorId: 'veronica-martin',
//     data: null,
//     poemId: 'veronica-martin--epilogue-in-summer',
//     loaded: false,
//     processNote: '',
//     url: 'epilogue-in-summer',
//     title: 'Epilogue in Summer',
//   },
// ]

// const poems = [
//   {
//     author: 'Aja Moore',
//     authorId: 'aja-moore',
//     data: null,
//     poemId: 'aja-moore--tgif',
//     loaded: false,
//     processNote: '',
//     url: 'tgif',
//     title: 'TGIF',
//   }, {
//     author: 'Annelyse Gelman',
//     authorId: 'annelyse-gelman',
//     data: null,
//     poemId: 'annelyse-gelman--prosperity',
//     loaded: false,
//     processNote: '',
//     url: 'prosperity',
//     title: 'Prosperity',
//   }, {
//     author: 'Eleanor Eli Moss',
//     authorId: 'eleanor-eli-moss',
//     data: null,
//     poemId: 'eleanor-eli-moss---the-hammer',
//     loaded: false,
//     processNote: '',
//     url: 'the-hammer',
//     title: 'THE HAMMER',
//   }, {
//     author: 'Hedgie Choi',
//     authorId: 'hedgie-choi',
//     data: null,
//     poemId: 'hedgie-choi--i-get-it-phases',
//     loaded: false,
//     processNote: '',
//     url: 'i-get-it-phases',
//     title: 'I Get It Phases',
//   }, {
//     author: 'Jackson Holbert',
//     authorId: 'jackson-holbert',
//     data: null,
//     poemId: 'jackson-holbert--poem-about-judges',
//     loaded: false,
//     processNote: '',
//     url: 'poem-about-judges',
//     title: 'Poem About Judges',
//   }, {
//     author: 'Jackson Holbert',
//     authorId: 'jackson-holbert',
//     data: null,
//     poemId: 'jackson-holbert--poem-involving-the-sea',
//     loaded: false,
//     processNote: '',
//     url: 'poem-involving-the-sea',
//     title: 'Poem Involving the Sea',
//   }, {
//     author: 'Jose Hernandez Diaz',
//     authorId: 'jose-hernandez-diaz',
//     data: null,
//     poemId: 'jose-hernandez-diaz--the-dahlias-in-autumn',
//     loaded: false,
//     processNote: '',
//     url: 'the-dahlias-in-autumn',
//     title: 'The Dahlias in Autumn',
//   }, {
//     author: 'Manuel Arturo Abreu',
//     authorId: 'manuel-arturo-abreu',
//     data: null,
//     poemId: 'manuel-arturo-abreau--ablation',
//     loaded: false,
//     processNote: '',
//     url: 'ablation',
//     title: 'Ablation',
//   }, {
//     author: 'Sarah Matthes',
//     authorId: 'sarah-matthes',
//     data: null,
//     poemId: 'sarah-matthes--averting-my-eyes',
//     loaded: false,
//     processNote: '',
//     url: 'averting-my-eyes',
//     title: 'Averting My Eyes',
//   }, {
//     author: 'Veronica Martin',
//     authorId: 'veronica-martin',
//     data: null,
//     poemId: 'veronica-martin--epilogue-in-summer',
//     loaded: false,
//     processNote: '',
//     url: 'epilogue-in-summer',
//     title: 'Epilogue in Summer',
//   }, {
//     author: 'Zachary Schomburg',
//     authorId: 'zachary-schomburg',
//     data: null,
//     poemId: 'zachary-schomburg--2-poems',
//     loaded: false,
//     processNote: '',
//     url: '2-poems',
//     title: '2 Poems',
//   },
// ]

const poems = [
  {
    author: 'manuel arturo abreu',
    authorId: 'manuel-arturo-abreu',
    data: null,
    poemId: 'manuel-arturo-abreau--ablation',
    loaded: false,
    processNote: '',
    url: 'ablation',
    title: 'Ablation',
  }, {
    author: 'Hedgie Choi',
    authorId: 'hedgie-choi',
    data: null,
    poemId: 'hedgie-choi--i-get-it-phases',
    loaded: false,
    processNote: '',
    url: 'i-get-it-phases',
    title: 'I Get It, Phases',
  }, {
    author: 'Annelyse Gelman',
    authorId: 'annelyse-gelman',
    data: null,
    poemId: 'annelyse-gelman--prosperity',
    loaded: false,
    processNote: '',
    url: 'prosperity',
    title: 'Prosperity',
  }, {
    author: 'Jackson Holbert',
    authorId: 'jackson-holbert',
    data: null,
    poemId: 'jackson-holbert--poem-involving-the-sea',
    loaded: false,
    processNote: '',
    url: 'poem-involving-the-sea',
    title: 'Poem Involving the Sea',
  }, {
    author: 'Eleanor Eli Moss',
    authorId: 'eleanor-eli-moss',
    data: null,
    poemId: 'eleanor-eli-moss---the-hammer',
    loaded: false,
    processNote: '',
    url: 'the-hammer',
    title: 'THE HAMMER',
  }, {
    author: 'Zachary Schomburg',
    authorId: 'zachary-schomburg',
    data: null,
    poemId: 'zachary-schomburg--2-poems',
    loaded: false,
    processNote: '',
    url: '2-poems',
    title: '2 Poems',
  },
]

const initialState: IState = {
  mobileNavOpen: false,
  poems,
  processNoteOpen: false,
}

const reducer = (
  state: IState = initialState,
  // TODO: Should be Action from `../types.ts`
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case LOAD_POEM_DATA:
      const { poemId, data, processNote } = payload
      return produce(state, draftState => {
        const poem = draftState.poems.find(poem => poem.poemId === poemId)
        if (poem) {
          poem.loaded = true
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
