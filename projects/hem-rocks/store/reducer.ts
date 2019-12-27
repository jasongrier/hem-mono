import { AnyAction } from 'redux'
import { slugify, titleCase } from 'voca'
import randomWords from 'random-words'
import randomHexColor from 'random-hex-color'
import {
  CAROUSEL_NEXT,
  CAROUSEL_PREVIOUS,
  LOG_IN,
  LOG_IN_CHECK_REQUEST,
  LOG_IN_CHECK_RESULT,
  LOG_IN_RESET_ERROR,
  LOG_OUT,
  PLAYER_PAUSE,
  PLAYER_PLAY,
  PLAYER_SET_SOUND,
  PLAYER_SET_VOLUME,
  PLAYER_TOGGLE_PLAYING,

  IState,
  CAROUSEL_SET_INDEX,
  PLAYER_TOGGLE_MUTED,
  IArticle,
} from './types'

function createLogo(logoComponentName, hoverColor, linkTo, title, tipContent, transform) {
  return {
    featured: true,
    logoComponentName,
    hoverColor,
    linkTo,
    tipContent,
    title,
    transform,
  }
}

const projectLogos = [
  createLogo('MidstLogo', '#FF91AF', '/midst', 'Midst',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse justo enim, pharetra mattis pretium vitae, pharetra vitae orci. Ut sit amet iaculis dui.</p><p>Suspendisse posuere nulla hendrerit lectus feugiat imperdiet. Nulla eu hendrerit ipsum. Pellentesque ac dictum diam, sed imperdiet augue. Phasellus sagittis nisl sit amet purus ultricies scelerisque.</p>',
  'translateX(-1px)'),

  createLogo('SoundLibraryLogo', '#0471a3', '/sound-library', 'Sound Library',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse justo enim, pharetra mattis pretium vitae, pharetra vitae orci. Ut sit amet iaculis dui.</p><p>Suspendisse posuere nulla hendrerit lectus feugiat imperdiet. Nulla eu hendrerit ipsum. Pellentesque ac dictum diam, sed imperdiet augue. Phasellus sagittis nisl sit amet purus ultricies scelerisque.</p>',
  'scale(.7)'),

  createLogo('SeuratLogo', '#a30473', '/seurat', 'Seurat',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse justo enim, pharetra mattis pretium vitae, pharetra vitae orci. Ut sit amet iaculis dui.</p><p>Suspendisse posuere nulla hendrerit lectus feugiat imperdiet. Nulla eu hendrerit ipsum. Pellentesque ac dictum diam, sed imperdiet augue. Phasellus sagittis nisl sit amet purus ultricies scelerisque.</p>',
  'scale(.6)'),
]

const packButtonText = 'Download now'

const carouselItems = [
  {
    headline: 'Grand Piano',
    subHeadline: 'New Ableton Live Pack:',
    buttonText: packButtonText,
    packId: 'grand-piano',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: `
      <p>Spicy concert grand in seven preparations: <i>Rice Paper, Black Cinefoil, Louis V Chain Strap, Modulor Tinplate, Vanilla, and Guitar Pick</i></p>
      <p><b>PLUS</b> a full percussion and drone selection sporting hand slaps, pedal hits, tickly scratches, growling bass, and the <b><i>full 88–key cluster chord</i></b></p>
      <p>Recorded <i>fortissississimo</i> in Berlin thru seven vintage mics and a crispy analog console</p>
      <p><b>Ten Ableton Live devices in total</b></p>
    `,
  },
  // {
  //   headline: 'Grand Piano',
  //   subHeadline: 'New Ableton Live Pack:',
  //   buttonText: packButtonText,
  //   packId: 'grand-piano',
  //   soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
  //   description: `
  //     <p>A smooth deep concert grand in five preparations<p>
  //     <ul>
  //       <li>– Rice Paper</li>
  //       <li>– Black Cinefoil</li>
  //       <li>– Louis Vuitton Chain</li>
  //       <li>– Steel Tinplate</li>
  //       <li>– Plectrum</li>
  //     </ul>
  //     <p><b>PLUS</b> a large one-shot selection consisting of hand slaps, forearm chords, finger bowing, e-bow drones, and the <b><i>full 88–key cluster chord</i></b></p>`,
  // },
  // }, {
  //   title: '5 New Packs for Ableton Live',
  //   buttonText: 'Listen and download',
  //   packId: '',
  //   soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
  //   description: `
  //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  //     <ul>
  //       <li>Grand Piano</li>
  //       <li>Grand Piano – Extended</li>
  //       <li>Viola</li>
  //       <li>Noise Reduction Artefacts</li>
  //       <li>Seurat for Push</li>
  //     </ul>
  //   `,
  // }, {
  //   title: 'New Pack: Grand Piano',
  //   buttonText: packButtonText,
  //   packId: 'grand-piano',
  //   soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
  // }, {
  //   title: 'New Pack: Grand Piano – Extended',
  //   buttonText: packButtonText,
  //   packId: 'grand-piano',
  //   soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
  // }, {
  //   title: 'New Pack: Viola',
  //   buttonText: packButtonText,
  //   packId: 'grand-piano',
  //   soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
  // }, {
  //   title: 'New Pack: Noise Reduction Artefacts',
  //   buttonText: packButtonText,
  //   packId: 'grand-piano',
  //   soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
  //   description: 'A cosmic synth made entirely from the sonic waste products of the industry\'s top noise reduction algorithms. Get sounds raging from glossy and chic to brain-rattling bass and haunting psychoacoustic effects',
  // }, {
  //   title: 'New Pack: Seurat 2',
  //   buttonText: packButtonText,
  //   packId: 'grand-piano',
  //   soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
  //   description: 'Seurat.',
  // }
]

const randomExcerptConfig = {
  exactly: 1,
  wordsPerString: 20,
}

const randomTitleConfig = {
  exactly: 1,
  wordsPerString: 2,
}

function fakeArticle(): IArticle {
  const category = 'Sound Library'
  const tags = ['sound', 'technology']
  const title = titleCase(randomWords(randomTitleConfig))
  const url = `/${slugify(category)}/${slugify(title)}`

  return {
    category,
    excerpt: randomWords(randomExcerptConfig),
    featured: true,
    image: {
      alt: title,
      tags,
      url: 'https://picsum.photos/720/400',
    },
    tags,
    title,
    url,
  }
}

const fakeArticles = Array(100).fill(null).map(fakeArticle)

const initialState: IState = {
  articles: fakeArticles,
  carouselIndex: 0,
  carouselItems,
  loggedIn: null,
  loginFailed: false,
  playerPlaying: false,
  playerSoundUrl: '',
  playerVolume: 0,
  projects: projectLogos,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case CAROUSEL_NEXT: {
      const { carouselIndex, carouselItems } = state
      return {
        ...state,
        carouselIndex: carouselIndex < carouselItems.length - 1 ? carouselIndex + 1 : carouselIndex
      }
    }

    // TODO: All projects; Wrap all cases in {}
    case CAROUSEL_PREVIOUS: {
      const { carouselIndex } = state
      return {
        ...state,
        carouselIndex: carouselIndex > 0 ? carouselIndex - 1 : 0
      }
    }

    case CAROUSEL_SET_INDEX: {
      return { ...state, carouselIndex: payload }
    }

    case LOG_IN: {
      const success = (
        payload.email === 'info@hem.rocks'
        && payload.password === 'easyeasy'
      )
      return { ...state, loggedIn: success, loginFailed: !success }
    }

    case LOG_IN_CHECK_REQUEST: {
      return state
    }

    case LOG_IN_CHECK_RESULT: {
      return { ...state, loggedIn: payload }
    }

    case LOG_IN_RESET_ERROR: {
      return { ...state, loginFailed: false }
    }

    case LOG_OUT: {
      return { ...state, loggedIn: false, loginFailed: false }
    }

    case PLAYER_PAUSE: {
      return { ...state, playerPlaying: false }
    }

    case PLAYER_PLAY: {
      return { ...state, playerPlaying: true }
    }

    case PLAYER_SET_SOUND: {
      return { ...state, playerSoundUrl: payload }
    }

    case PLAYER_SET_VOLUME: {
      return { ...state, playerVolume: payload }
    }

    case PLAYER_TOGGLE_MUTED: {
      const { playerVolume } = state
      return { ...state, playerVolume: playerVolume > 0 ? 0 : 1 }
    }

    case PLAYER_TOGGLE_PLAYING: {
      return { ...state, playerPlaying: !state.playerPlaying }
    }

    default: {
      return state
    }
  }
}

export {
  initialState,
  reducer,
}
