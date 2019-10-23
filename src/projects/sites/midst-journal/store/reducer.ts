import { AnyAction } from 'redux'
import {
  SET_MOBILE_NAV_OPEN,
  SET_PROCESS_NOTE_OPEN,

  IState,
} from './types'

const prelaunchPoems = [
  {
    author: 'Issue One launches soon!',
    hidden: false,
    slug: 'demo-1',
    title: '🌱',
    processNote: 'string',
  }, {
    author: ' ',
    hidden: false,
    slug: 'demo-2',
    title: ' ',
    processNote: 'string',
}, {
    author: ' ',
    hidden: false,
    slug: 'demo-3',
    title: ' ',
    processNote: 'string',
}, {
    author: ' ',
    hidden: false,
    slug: 'demo-4',
    title: ' ',
    processNote: 'string',
}, {
    author: 'Hedgie Choi',
    hidden: true,
    slug: 'untitled-hedgie',
    title: 'Untitled',
    processNote: 'Lorem ipsum dolor sit amet',
}, {
    author: 'Veronica Martin',
    hidden: true,
    slug: 'veronica-martin-epilogue-in-summer',
    title: 'Epilogue in Summer',
    processNote: 'Lorem ipsum dolor sit amet',
}, {
    author: 'Annelyse Gelman',
    hidden: false,
    slug: 'prosperity',
    title: 'Prosperity (Demonstration Poem)',
    processNote: `
      <h1>Process Note</h1>
      <p>
        I wrote "Prosperity" quickly, mostly as a demonstration of how Midst works—a kind of demonstration music for this platform. It is about the intelligence of pigs.
      </p>

      <h1>About the Author</h1>
      <p>
        Annelyse Gelman founded and directs Midst. Her work has appeared in <i>The New Yorker</i>, <i>BOMB Magazine</i>, <i>the PEN Poetry Series</i>, and elsewhere.
        She is the author of <i><a href="http://www.amazon.com/Everyone-I-Love-Stranger-Someone/dp/193891242X">Everyone I Love Is a Stranger to Someone</a></i>. Find her at <a href="http://www.annelysegelman.com">www.annelysegelman.com</a>.
      </p>
      <p>
        <img src="http://midst.press/journal-assets/author-photos/annelyse.png">
      </p>
    `,
  }
]

const devPoems = [
  {
    author: 'Angelo Colavita',
    hidden: false,
    slug: 'a-shade-whiter',
    title: 'A Shade Whiter',
    processNote: 'Lorem ipsum',
  },
  {
    author: 'Annelyse Gelman',
    hidden: false,
    slug: 'alphabet-song',
    title: 'Alphabet Song',
    processNote: 'Lorem ipsum',
  },
  {
    author: 'Annelyse Gelman',
    hidden: false,
    slug: 'pool',
    title: 'Pool',
    processNote: 'Lorem ipsum',
  },
  {
    author: 'Annelyse Gelman',
    hidden: false,
    slug: 'prosperity',
    title: 'Prosperity',
    processNote: 'Lorem ipsum',
  },
  {
    author: 'Hedgie Choi',
    hidden: false,
    slug: 'untitled',
    title: 'Untitled',
    processNote: 'Lorem ipsum',
  },
  {
    author: 'Veronica Martin',
    hidden: false,
    slug: 'epilogue-in-summer',
    title: 'Epilogue in Summer',
    processNote: 'Lorem ipsum',
  },
]

const initialState: IState = {
  mobileNavOpen: false,
  poems: devPoems,
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
