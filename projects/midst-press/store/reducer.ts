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

function createPoem(author: string, title: string, date: string, highlighted: boolean, authorSecondaryFolder?: any) {
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
    date,
    poemId: `${authorId}--${url}`,
    highlighted,
    loaded: false,
    processNote: '',
    url,
    tags: '',
    title,
  }
}

const MORI_POEM_LONG_TITLE = 'After Watching <i>Westworld</i>, the Left Side of My Body Malfunctions'

const poems = [
  createPoem('Test Poet',           'Test Poem',                '06.12.2020', true),
  createPoem('Anis Mojgani',        'Cuesta',                   '06.12.2020', false),
  createPoem('Anis Mojgani',        'Cuesta',                   '06.12.2020', false),
  createPoem('Eleanor Eli Moss',    'THE HAMMER',               '06.12.2020', false),
  createPoem('Hedgie Choi',         'I Get It, Phases',         '06.12.2020', false),
  createPoem('Jackson Holbert',     'Poem Involving the Sea',   '06.12.2020', false),
  createPoem('Dara Wier',           '5x5',                      '06.12.2020', false),
  createPoem('Aja Moore',           'TGIF',                     '06.12.2020', false),
  createPoem('manuel arturo abreu', 'Ablation',                 '06.12.2020', false),
  createPoem('Woosung Sohn',        'Driving License',          '06.12.2020', false),
  createPoem('Zachary Schomburg',   '2 Poems',                  '06.12.2020', false),
  createPoem('Jackson Holbert',     'Poem About Judges',        '06.12.2020', false, 'jackson-holbert-2'),
  createPoem('Jenny Qi',            'When This Is All Over',    '06.12.2020', false),
  createPoem('Veronica Martin',     'Epilogue in Summer',       '06.12.2020', false),
  createPoem('Jose Hernandez Diaz', 'The Dahlias in Autumn',    '06.12.2020', false),
  createPoem('Max Seifert',         'Benjamins',                '06.12.2020', false),
  createPoem('Madeleine Mori',      MORI_POEM_LONG_TITLE,       '06.12.2020', false),
  createPoem('Mia You',             'Go Bokito',                '06.12.2020', false),
  createPoem('Sarah Matthes',       'Averting My Eyes',         '06.12.2020', false),
  createPoem('Annelyse Gelman',     'Prosperity',               '06.12.2020', false),
  createPoem('Annelyse Gelman',     'Pool',                     '06.12.2020', false),
  createPoem('Annelyse Gelman',     'Questions',                '06.12.2020', false),
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
