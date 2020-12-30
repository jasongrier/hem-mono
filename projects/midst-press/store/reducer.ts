import { AnyAction } from 'redux'
import { sortBy, reverse } from 'lodash'
import produce from 'immer'
// deliberately including newline between SET_PROCESS_NOTE_OPEN and IState
// to satisfy linter grouping
import {
  LOAD_POEM_DATA,
  REVERSE_SORT_ORDER,
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,
  SET_SORT_TERM,

  IState,
} from './types'
import moment from 'moment'
import { slugify } from 'voca'

function createPoem(author: string, title: string, date: string, publishDate: string, highlighted: boolean, badge?: string | null | undefined, authorSecondaryFolder?: any) {
  const authorId = author.toLowerCase().replace(/ /g, '-')
  const url = title.toLowerCase()
    .replace(/ /g, '-')
    .replace(/\,/g, '')
    .replace('<i>', '')
    .replace('</i>', '')
    .replace('-:)', '')
    .replace('{::', '')
    .replace('::}', '')
    .replace(/-$/, '')
    .replace(/--/g, '-')

  return {
    author,
    authorId,
    authorSecondaryFolder,
    data: null,
    date: moment(date),
    publishDate: moment(publishDate),
    poemId: `${authorId}--${url}`,
    highlighted,
    loaded: false,
    processNote: '',
    url,
    slug: slugify(title),
    tags: '',
    title,
    badge,
  }
}

function sortPoems(draftState: IState) {
  let finalPoems = Array.from(draftState.poems)

  finalPoems = sortBy(poems, draftState.sortTerm)

  if (draftState.sortOrder === 'DESC') {
    finalPoems = reverse(finalPoems)
  }

  return finalPoems
}

const MORI_POEM_LONG_TITLE = 'After Watching <i>Westworld</i>, the Left Side of My Body Malfunctions'

const poems = [
  createPoem('Jos Charles',                 'and',                                '02/09/2021', '11/23/2020', true,   'New'),
  createPoem('Imani Elizabeth Jackson',     'And went to plant',                  '02/09/2021', '12/24/2020', true,   'New'),
  createPoem('Dan Beachy-Quick',            'Mnemosyne in Tatters',               '02/09/2021', '10/16/2020', true,   'New'),
  createPoem('Rosebud Ben-Oni',             'Poet Wrestling with the Dead Stars We Are {:: made from ::}',                      '02/09/2021', '12/24/2020', true,   'New'),
  createPoem('Gabrielle Bates',             'Ownership',                          '02/09/2021', '10/17/2020', true,   'New'),
  createPoem('Zachary Schomburg',             'Flushing Michigan',                          '02/09/2021', '11/22/2020', true, 'New',  'zachary-schomburg-2'),
  // createPoem('Sadie Dupuis',                'COME OVER MAKE MAC AND CHEESE :)',   '01/26/2021', '12/17/2020', true,   'New'),
  // createPoem('Annelyse Gelman',             'Pool',                               '01/05/2021', '12/17/2020', true,   'New'),
  createPoem('Anis Mojgani',                'Cuesta',                             '11/30/2019', '11/30/2019', false),
  createPoem('Eleanor Eli Moss',            'THE HAMMER',                         '11/06/2019', '11/06/2019', false),
  createPoem('Hedgie Choi',                 'I Get It, Phases',                   '10/17/2019', '10/17/2019', false),
  createPoem('Jackson Holbert',             'Poem Involving the Sea',             '10/31/2019', '10/31/2019', false),
  createPoem('Dara Wier',                   '5x5',                                '10/10/2019', '10/10/2019', false),
  createPoem('Aja Moore',                   'TGIF',                               '10/01/2019', '10/01/2019', false),
  createPoem('manuel arturo abreu',         'Ablation',                           '09/14/2019', '09/14/2019', false),
  createPoem('Woosung Sohn',                'Driving License',                    '10/31/2019', '10/31/2019', false),
  createPoem('Zachary Schomburg',           '2 Poems',                            '09/29/2019', '09/29/2019', false),
  createPoem('Jackson Holbert',             'Poem About Judges',                  '10/31/2019', '10/31/2019', false,  null,     'jackson-holbert-2'),
  createPoem('Jenny Qi',                    'When This Is All Over',              '11/10/2019', '11/10/2019', false),
  createPoem('Veronica Martin',             'Epilogue in Summer',                 '08/19/2019', '08/19/2019', false),
  createPoem('Jose Hernandez Diaz',         'The Dahlias in Autumn',              '08/14/2019', '08/14/2019', false),
  createPoem('Max Seifert',                 'Benjamins',                          '11/08/2019', '11/08/2019', false),
  createPoem('Madeleine Mori',               MORI_POEM_LONG_TITLE,                '11/05/2019', '11/05/2019', false),
  createPoem('Mia You',                     'Go Bokito',                          '11/10/2019', '11/10/2019', false),
  createPoem('Sarah Matthes',               'Averting My Eyes',                   '11/02/2019', '11/02/2019', false),
  createPoem('Annelyse Gelman',             'Prosperity',                         '02/06/2019', '02/06/2019', false),
]

const initialState: IState = {
  mobileNavOpen: false,
  poems,
  processNoteOpen: false,
  sortOrder: 'ASC',
  sortTerm: 'publishDate',
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

    case REVERSE_SORT_ORDER:
      return produce(state, draftState => {
        if (draftState.sortOrder === 'DESC') {
          draftState.sortOrder = 'ASC'
        }

        else {
          draftState.sortOrder = 'DESC'
        }

        draftState.poems = sortPoems(draftState)
      })

    case SET_MOBILE_NAV_OPEN:
      return { ...state, mobileNavOpen: payload }

    case SET_PROCESS_NOTE_OPEN:
      return { ...state, processNoteOpen: payload }

    case SET_SORT_TERM:
      return produce(state, draftState => {
        draftState.sortTerm = payload
        draftState.poems = sortPoems(draftState)
      })

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
