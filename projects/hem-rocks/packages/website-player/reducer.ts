import { AnyAction } from 'redux'
import {
  HEM_WEBSITE_PLAYER_PAUSE,
  HEM_WEBSITE_PLAYER_PLAY,
  HEM_WEBSITE_PLAYER_SET_SOUND,
  HEM_WEBSITE_PLAYER_SET_VOLUME,
  HEM_WEBSITE_PLAYER_TOGGLE_MUTED,
  HEM_WEBSITE_PLAYER_TOGGLE_PLAYING,

  IState,
} from './index'

const initialState: IState = {
  playing: false,
  soundUrl: null,
  volume: 0,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case HEM_WEBSITE_PLAYER_PAUSE: {
      return { ...state, playing: false }
    }

    case HEM_WEBSITE_PLAYER_PLAY: {
      return { ...state, playing: true }
    }

    case HEM_WEBSITE_PLAYER_SET_SOUND: {
      return { ...state, soundUrl: payload }
    }

    case HEM_WEBSITE_PLAYER_SET_VOLUME: {
      return { ...state, volume: payload }
    }

    case HEM_WEBSITE_PLAYER_TOGGLE_MUTED: {
      const { volume } = state
      return { ...state, volume: volume > 0 ? 0 : 1 }
    }

    case HEM_WEBSITE_PLAYER_TOGGLE_PLAYING: {
      return { ...state, playing: !state.playing }
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
