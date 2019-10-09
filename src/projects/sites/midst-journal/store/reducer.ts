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
      slug: 'demo',
      title: '🌱',
      author: 'Issue One launches soon!',
      processNote: 'string',
    }, {
      slug: 'demo',
      title: ' ',
      author: ' ',
      processNote: 'string',
  }, {
      slug: 'demo',
      title: ' ',
      author: ' ',
      processNote: 'string',
  }, {
      slug: 'demo',
      title: ' ',
      author: ' ',
      processNote: 'string',
  }, {
      slug: 'demo',
      title: ' ',
      author: ' ',
      processNote: 'string',
  }, {
      slug: 'prosperity',
      title: 'Prosperity (Demonstration Poem)',
      author: 'Annelyse Gelman',
      processNote: `
      <h1>
      Process Note
      </h1>
      <p>
      I wrote "Prosperity" quickly, mostly as a demonstration of how Midst works—a kind of demonstration music for this platform. It is about the intelligence of pigs.
      </p>
      <h1>
      About the Author
      </h1>
      <p>
      Annelyse Gelman founded and directs Midst. Her work has appeared in <i>The New Yorker</i>, <i>BOMB Magazine</i>, <i>the PEN Poetry Series</i>, and elsewhere. 
      She is the author of <i><a href="http://www.amazon.com/Everyone-I-Love-Stranger-Someone/dp/193891242X">Everyone I Love Is a Stranger to Someone</a></i>. Find her at <a href="http://www.annelysegelman.com">www.annelysegelman.com</a>.
      </p>
      <p>
      <img src="http://midst.press/journal-assets/author-photos/annelyse.png">
      </p>
      `,
    },







    // {
    //   slug: 'a-shade-whiter',
    //   title: 'A Shade Whiter',
    //   author: 'Angelo Colavita',
    // },
    // {
    //   slug: 'pool',
    //   title: 'Pool',
    //   author: 'Annelyse Gelman',
    // },
    // {
    //   slug: 'a-shade-whiter-1',
    //   title: 'This Is the Title of a Poem',
    //   author: 'Ryan Paradiso',
    // },
    // {
    //   slug: 'pool-1',
    //   title: 'Two Poems',
    //   author: 'Zachary Schomburg',
    // },
    // {
    //   slug: 'prosperity-1',
    //   title: 'Poem Title',
    //   author: 'Matthew Zapruder',
    // },
    // {
    //   slug: 'alphabet-song-1',
    //   title: 'A Name of Some Poem by Sarah',
    //   author: 'Sarah Matthes',
    // },
    // {
    //   slug: 'prosperity',
    //   title: 'A New Poem',
    //   author: 'Danniel Schoonebeek',
    // },
    // {
    //   slug: 'alphabet-song',
    //   title: 'Something-or-Other',
    //   author: 'Anis Mojgani',
    // }
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
