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
  secret: string
  secondaryAttribution: string
  secondaryAttributionLink: string
  title: string
  titleLink: string
  type: string // 'local' | 'soundcloud'
}

export interface IPlaylist {
  id: string
  name: string
  tracks: ITrack[]
}

export interface IState {
  actuallyPlaying: boolean
  currentTrack: ITrack
  currentPlaylist: IPlaylist
  inited: boolean
  muted: boolean
  playing: boolean
  playlists: IPlaylist[]
}

export const ADD_PLAYLIST = 'ADD_PLAYLIST'
export const MUTE_PLAYER = 'MUTE_PLAYER'
export const NEXT_TRACK = 'NEXT_TRACK'
export const PAUSE_PLAYER = 'PAUSE_PLAYER'
export const CUE_TRACK = 'CUE_TRACK'
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK'
export const REPLACE_PLAYLIST = 'REPLACE_PLAYLIST'
export const SEEK_PLAYER = 'SEEK_PLAYER'
export const SET_PLAYER_INSTANCE = 'SET_PLAYER_INSTANCE'
export const SET_PLAYER_PLAYLIST = 'SET_PLAYER_PLAYLIST'
export const SET_PLAYER_ACTUALLY_PLAYING = 'SET_PLAYER_ACTUALLY_PLAYING'
export const TRACK_ENDED = 'TRACK_ENDED'
export const UNMUTE_PLAYER = 'UNMUTE_PLAYER'
export const UNPAUSE_PLAYER = 'UNPAUSE_PLAYER'

/* TODO: These are not alphabetised, make a linter for this */
export interface IAddPlaylist extends AnyAction {
  type: typeof ADD_PLAYLIST
  payload: Partial<IPlaylist>
}

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

export interface IReplacePlaylist extends AnyAction {
  type: typeof REPLACE_PLAYLIST
  payload: { number: number, playlist: Partial<IPlaylist> }
}

export interface ISeekPlayer extends AnyAction {
  type: typeof SEEK_PLAYER
  payload: number
}

export interface ISetPlayerPlaylist extends AnyAction {
  type: typeof SET_PLAYER_PLAYLIST
  payload: number
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
  IAddPlaylist
  | IMutePlayer
  | INextTrack
  | IPausePlayer
  | IReplacePlaylist
  | ICueTrack
  | IPreviousTrack
  | ISeekPlayer
  | ISetPlayerActuallyPlaying
  | ISetPlayerPlaylist
  | ITrackEnded
  | IUnmutePlayer
  | IUnpausePlayer

export {
  addPlaylist,
  cueTrack,
  mutePlayer,
  nextTrack,
  pausePlayer,
  previousTrack,
  replacePlaylist,
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
  Playlist,
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
