import { AnyAction } from 'redux'

declare const window: any

window.HEM_PLAYER_SOUNDCLOUD_PLAYER_INSTANCE = null

export interface ITrack {
  attribution: string
  attributionLink: string
  relatedContent: string
  relatedContentLink: string
  id: string
  resource: string
  type: 'local' | 'soundcloud'
}

export interface IState {
  actuallyPlaying: boolean
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
export const CUE_TRACK = 'CUE_TRACK'
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK'
export const SEEK_PLAYER = 'SEEK_PLAYER'
export const SET_PLAYER_INSTANCE = 'SET_PLAYER_INSTANCE'
export const SET_PLAYER_PLAYLIST = 'SET_PLAYER_PLAYLIST'
export const SET_PLAYER_ACTUALLY_PLAYING = 'SET_PLAYER_ACTUALLY_PLAYING'
export const TRACK_ENDED = 'TRACK_ENDED'
export const UNMUTE_PLAYER = 'UNMUTE_PLAYER'
export const UNPAUSE_PLAYER = 'UNPAUSE_PLAYER'

export interface ISetPlayerActuallyPlaying extends AnyAction {
  type: typeof SET_PLAYER_ACTUALLY_PLAYING
  payload: boolean
}

export interface ICueTrack extends AnyAction {
  type: typeof CUE_TRACK
  payload: { track: ITrack, andPlay: boolean }
}

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

export interface ISeekPlayer extends AnyAction {
  type: typeof SEEK_PLAYER
  payload: number
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
  | ICueTrack
  | IPreviousTrack
  | ISeekPlayer
  | ISetPlayerActuallyPlaying
  | ISetPlayerPlaylist
  | ITrackEnded
  | IUnmutePlayer
  | IUnpausePlayer

export {
  cueTrack,
  mutePlayer,
  nextTrack,
  pausePlayer,
  previousTrack,
  seekPlayer,
  setPlayerActuallyPlaying,
  setPlayerPlaylist,
  trackEnded,
  unmutePlayer,
  unpausePlayer,
} from './actions'


export {
  MuteButton,
  NextButton,
  PauseButton,
  PlayerBar,
  PlayerBarPlayPauseButton,
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
  seekPlayerSaga,
  trackEndedSaga,
  unmutePlayerSaga,
  unpausePlayerSaga,
} from './sagas'

export {
  getNextTrack,
  getPreviousTrack,
} from './functions'
