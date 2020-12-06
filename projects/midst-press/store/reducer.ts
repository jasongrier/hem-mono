import { AnyAction } from 'redux'
import produce from 'immer'
// deliberately including newline between SET_PROCESS_NOTE_OPEN and IState
// to satisfy linter grouping
import {
  LOAD_POEM_DATA,
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,

  IState,
} from './types'

function createPoem(author: string, title: string, authorSecondaryFolder?: any) {
  const authorId = author.toLowerCase().replace(/ /g, '-')
  const url = title.toLowerCase()
    .replace(/ /g, '-')
    .replace(/\,/g, '')
    .replace('<i>', '')
    .replace('</i>', '')

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
  createPoem('Test Poet', 'Test Poem'),
  createPoem('Anis Mojgani', 'Cuesta'),
  createPoem('Anis Mojgani', 'Cuesta'),
  createPoem('Eleanor Eli Moss', 'THE HAMMER'),
  createPoem('Hedgie Choi', 'I Get It, Phases'),
  createPoem('Jackson Holbert', 'Poem Involving the Sea'),
  createPoem('Dara Wier', '5x5'),
  createPoem('Aja Moore', 'TGIF'),
  createPoem('manuel arturo abreu', 'Ablation'),
  createPoem('Woosung Sohn', 'Driving License'),
  createPoem('Zachary Schomburg', '2 Poems'),
  createPoem('Jackson Holbert', 'Poem About Judges', 'jackson-holbert-2'),
  createPoem('Jenny Qi', 'When This Is All Over'),
  createPoem('Veronica Martin', 'Epilogue in Summer'),
  createPoem('Jose Hernandez Diaz', 'The Dahlias in Autumn'),
  createPoem('Max Seifert', 'Benjamins'),
  createPoem('Madeleine Mori', 'After Watching <i>Westworld</i>, the Left Side of My Body Malfunctions'),
  createPoem('Mia You', 'Go Bokito'),
  createPoem('Sarah Matthes', 'Averting My Eyes'),
  createPoem('Annelyse Gelman', 'Prosperity'),
  createPoem('Annelyse Gelman', 'Pool'),
  createPoem('Annelyse Gelman', 'Questions'),
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
