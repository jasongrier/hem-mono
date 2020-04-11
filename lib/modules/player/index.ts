import { AnyAction } from 'redux'

export interface ITrack {
  id: string
  type: 'local' | 'soundcloud'
  resource: string
}

export interface IState {
  currentTrackId: string | null
  currentTrackType: string | null
  currentTrackResource: string | null
  inited: boolean
  muted: boolean
  playing: boolean
  playerInstance: any
}

export const MUTE_PLAYER = 'MUTE_PLAYER'
export const PAUSE_PLAYER = 'PAUSE_PLAYER'
export const PLAY_PLAYER = 'PLAY_PLAYER'
export const SET_PLAYER_INSTANCE = 'SET_PLAYER_INSTANCE'
export const UNMUTE_PLAYER = 'UNMUTE_PLAYER'
export const UNPAUSE_PLAYER = 'UNPAUSE_PLAYER'

export interface IMutePlayer extends AnyAction {
  type: typeof MUTE_PLAYER
  payload: null
}

export interface IPausePlayer extends AnyAction {
  type: typeof PAUSE_PLAYER
  payload: null
}

export interface IPlayPlayer extends AnyAction {
  type: typeof PLAY_PLAYER
  payload: ITrack
}

export interface ISetPlayerInstance extends AnyAction {
  type: typeof SET_PLAYER_INSTANCE
  payload: null
}

export interface IUnmutePlayer extends AnyAction {
  type: typeof UNMUTE_PLAYER
  payload: null
}

export interface IUnpausePlayer extends AnyAction {
  type: typeof UNPAUSE_PLAYER
  payload: null
}

export type Action =
  IMutePlayer
  | IPausePlayer
  | IPlayPlayer
  | ISetPlayerInstance
  | IUnmutePlayer
  | IUnpausePlayer

export {
  mutePlayer,
  pausePlayer,
  playPlayer,
  setPlayerInstance,
  unmutePlayer,
  unpausePlayer,
} from './actions'


export {
  MuteButton,
  PauseButton,
  ProgressBar,
  StopButton,
  TrackPlayPauseButton,
} from './components'

export { reducer as playerReducer } from './reducer'

export {
  mutePlayerSaga,
  pausePlayerSaga,
  playPlayerSaga,
  unmutePlayerSaga,
  unpausePlayerSaga,
} from './sagas'
