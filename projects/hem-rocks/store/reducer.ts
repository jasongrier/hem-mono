import { AnyAction } from 'redux'
import { slugify, titleCase } from 'voca'
import randomWords from 'random-words'
import {
  LOG_IN,
  LOG_IN_CHECK_REQUEST,
  LOG_IN_CHECK_RESULT,
  LOG_IN_RESET_ERROR,
  LOG_OUT,
  SET_STUCK_PENCIL,
  SET_STUCK_PLAYER,

  IState,
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

const randomExcerptConfig = {
  exactly: 1,
  wordsPerString: 20,
}

const randomTitleConfig = {
  exactly: 1,
  wordsPerString: 2,
}

function grandFakeArticle(title: string): IArticle {
  const category = 'Sound Library'
  const subCategory = 'Grand Piano'
  const tags = ['sound', 'technology']
  const url = `/${slugify(category)}/${slugify(title)}`

  return {
    category,
    excerpt: randomWords(randomExcerptConfig),
    featured: true,
    imageComponent: 'Planes',
    subCategory,
    tags,
    title,
    url,
  }
}

function soonFakeArticle(title: string): IArticle {
  const category = 'Sound Library'
  const subCategory = 'Coming Soon'
  const tags = ['sound', 'technology']
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
    subCategory,
    tags,
    title,
    url,
  }
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
    subCategory: null,
    tags,
    title,
    url,
  }
}

const fakeArticles = Array(100).fill(null).map(fakeArticle)

fakeArticles.push(grandFakeArticle('Rice Paper'))
fakeArticles.push(grandFakeArticle('Steel Tinplate'))
fakeArticles.push(grandFakeArticle('Black Cinefoil'))
fakeArticles.push(grandFakeArticle('Louis V Chain'))
fakeArticles.push(grandFakeArticle('Plectrum'))
fakeArticles.push(grandFakeArticle('Percussion'))
fakeArticles.push(grandFakeArticle('Drones'))
fakeArticles.push(grandFakeArticle('Cluster Catalogue'))
fakeArticles.push(soonFakeArticle('Free Guitar'))
fakeArticles.push(soonFakeArticle('Noise Reduction Artefacts II'))
fakeArticles.push(soonFakeArticle('Viola'))
fakeArticles.push(soonFakeArticle('Seurat II'))

const initialState: IState = {
  articles: fakeArticles,
  loggedIn: null,
  loginFailed: false,
  projects: projectLogos,
  stuckPencil: false,
  stuckPlayer: false,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
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

    case SET_STUCK_PENCIL: {
      return { ...state, stuckPencil: payload }
    }

    case SET_STUCK_PLAYER: {
      return { ...state, stuckPlayer: payload }
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
