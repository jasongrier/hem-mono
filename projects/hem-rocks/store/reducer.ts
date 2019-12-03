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
    title: '5 New Packs for Ableton Live',
    buttonText: 'Listen',
    packId: null,
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
  }, {
    title: 'Grand Piano',
    buttonText: packButtonText,
    packId: 'grand-piano',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
  }, {
    title: 'Grand Piano – Extended',
    buttonText: packButtonText,
    packId: 'grand-piano',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
  }, {
    title: 'Viola',
    buttonText: packButtonText,
    packId: 'grand-piano',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
  }, {
    title: 'Noise Reduction Artefacts',
    buttonText: packButtonText,
    packId: 'grand-piano',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
  }, {
    title: 'Seurat for Push',
    buttonText: packButtonText,
    packId: 'grand-piano',
    soundUrl: 'http://static.hem.rocks/hem-rocks/sl-demos/grand_piano_test_november.mp3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend nisi non enim consequat tempus. Phasellus eget lacinia mi. Suspendisse molestie commodo mauris, quis maximus odio varius ut.',
  }
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
