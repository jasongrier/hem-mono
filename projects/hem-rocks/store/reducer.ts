import { AnyAction } from 'redux'
import {
  CAROUSEL_NEXT,
  CAROUSEL_PREVIOUS,
  PLAYER_PAUSE,
  PLAYER_PLAY,
  PLAYER_SET_SOUND,
  PLAYER_SET_VOLUME,
  PLAYER_TOGGLE_PLAYING,

  IState,
  CAROUSEL_SET_INDEX,
  PLAYER_TOGGLE_MUTED,
} from './types'

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

const initialState: IState = {
  carouselIndex: 0,
  carouselItems,
  playerPlaying: false,
  playerSoundUrl: '',
  playerVolume: 0,
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

    case PLAYER_PAUSE:
      return { ...state, playerPlaying: false }

    case PLAYER_PLAY:
      return { ...state, playerPlaying: true }

    case PLAYER_SET_SOUND:
      return { ...state, playerSoundUrl: payload }

    case PLAYER_SET_VOLUME:
      return { ...state, playerVolume: payload }

    case PLAYER_TOGGLE_MUTED:
      const { playerVolume } = state
      return { ...state, playerVolume: playerVolume > 0 ? 0 : 1 }

    case PLAYER_TOGGLE_PLAYING:
      return { ...state, playerPlaying: !state.playerPlaying }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
