import { AnyAction } from 'redux'
import {
  PLAYER_PAUSE,
  PLAYER_PLAY,
  PLAYER_SET_SOUND,
  PLAYER_SET_VOLUME,

  IState,
} from './types'

const initialState: IState = {
  playerPlaying: false,
  playerSoundUrl: '',
  playerVolume: 0,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case PLAYER_PAUSE:
      return { ...state, playerPlaying: false }

    case PLAYER_PLAY:
      return { ...state, playerPlaying: true }

    case PLAYER_SET_SOUND:
      return { ...state, playerSoundUrl: payload }

    case PLAYER_SET_VOLUME:
      return { ...state, playerVolume: payload }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
