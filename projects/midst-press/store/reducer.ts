import { AnyAction } from 'redux'
import produce from 'immer'
import {
  LOAD_POEM_DATA,
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,

  IState,
} from './types'

function createPoem(author: string, title: string, authorSecondaryFolder?) {
  const authorId = author.toLowerCase().replace(/ /g, '-')
  const url = title.toLowerCase().replace(/ /g, '-').replace(/\,/g, '')

  return {
    author,
    authorId,
    authorSecondaryFolder,
    data: null,
    poemId: `${authorId}--${url}`,
    loaded: false,
    processNote: '',
    url,
    title,
  }
}

const poems = [
  createPoem('Aja Moore', 'TGIF'),
  createPoem('Anis Mojgani', 'Cuesta'),
  createPoem('Annelyse Gelman', 'Prosperity'),
  createPoem('Dara Wier', '5x5'),
  createPoem('Eleanor Eli Moss', 'THE HAMMER'),
  createPoem('Hedgie Choi', 'I Get It, Phases'),
  createPoem('Jackson Holbert', 'Poem About Judges', 'jackson-holbert-2'),
  createPoem('Jackson Holbert', 'Poem Involving the Sea'),
  createPoem('Jenny Qi', 'When This Is All Over'),
  createPoem('Jose Hernandez Diaz', 'The Dahlias in Autumn'),
  createPoem('Madeleine Mori', 'After Watching Westworld the Left Side of My Body Malfunctions'),
  createPoem('manuel arturo abreu', 'Ablation'),
  createPoem('Max Seifert', 'Benjamins'),
  createPoem('Mia You', 'Go Bokito'),
  createPoem('Sarah Matthes', 'Averting My Eyes'),
  createPoem('Veronica Martin', 'Epilogue in Summer'),
  createPoem('Woosung Sohn', 'Driving License'),
  createPoem('Zachary Schomburg', '2 Poems'),
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
