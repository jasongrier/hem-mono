import { AnyAction } from 'redux'

declare const window: any

window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE = null

export interface ITrack {
  attribution: string
  id: string
  resource: string
  type: 'local' | 'soundcloud'
}

export interface IState {
  currentTrackAttribution: string | null
  currentTrackId: string | null
  currentTrackResource: string | null
  currentTrackType: string | null
  inited: boolean
  muted: boolean
  playing: boolean
  playlist: ITrack[]
}

export const MUTE_PLAYER = 'MUTE_PLAYER'
export const NEXT_TRACK = 'NEXT_TRACK'
export const PAUSE_PLAYER = 'PAUSE_PLAYER'
export const PLAY_PLAYER = 'PLAY_PLAYER'
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK'
export const SET_PLAYER_INSTANCE = 'SET_PLAYER_INSTANCE'
export const SET_PLAYER_PLAYLIST = 'SET_PLAYER_PLAYLIST'
export const TRACK_ENDED = 'TRACK_ENDED'
export const UNMUTE_PLAYER = 'UNMUTE_PLAYER'
export const UNPAUSE_PLAYER = 'UNPAUSE_PLAYER'

export interface IMutePlayer extends AnyAction {
  type: typeof MUTE_PLAYER
  payload: null
}

export interface INextTrack extends AnyAction {
  type: typeof NEXT_TRACK
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

export interface ISetPlayerPlaylist extends AnyAction {
  type: typeof SET_PLAYER_PLAYLIST
  payload: ITrack[]
}

export interface IPreviousTrack extends AnyAction {
  type: typeof PREVIOUS_TRACK
  payload: null
}

export interface ITrackEnded extends AnyAction {
  type: typeof TRACK_ENDED
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
  | INextTrack
  | IPausePlayer
  | IPlayPlayer
  | IPreviousTrack
  | ISetPlayerPlaylist
  | ITrackEnded
  | IUnmutePlayer
  | IUnpausePlayer

export {
  mutePlayer,
  nextTrack,
  pausePlayer,
  playPlayer,
  previousTrack,
  setPlayerPlaylist,
  trackEnded,
  unmutePlayer,
  unpausePlayer,
} from './actions'


export {
  MuteButton,
  NextButton,
  PauseButton,
  PlayPauseButton,
  PreviousButton,
  ProgressBar,
  StopButton,
  TrackPlayPauseButton,
} from './components'

export { reducer as playerReducer } from './reducer'

export {
  mutePlayerSaga,
  nextTrackSaga,
  pausePlayerSaga,
  playPlayerSaga,
  previousTrackSaga,
  trackEndedSaga,
  unmutePlayerSaga,
  unpausePlayerSaga,
} from './sagas'

export {
  getNextTrack,
  getPreviousTrack,
} from './functions'
