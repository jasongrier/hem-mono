import { AnyAction } from 'redux'

export const playerElementId = 'hem-website-player'

export interface ITrack {
  attribution: string
  attributionLink: string
  date: string
  duration: string
  keyArt: string
  relatedContent: string
  relatedContentLink: string
  id: string
  resource: string
  secret: string
  secondaryAttribution: string
  secondaryAttributionLink: string
  title: string
  titleLink: string
}

export interface IPlaylist {
  id: string
  name: string
  tracks: ITrack[]

  component?: any
}

export interface IAlbum extends IPlaylist {
  attribution: string
  coverArt: string
  date: string
}

export interface IState {
  actuallyPlaying: boolean
  alreadyOpened: boolean
  currentPlaylist: IPlaylist | null
  currentTrack: ITrack | null
  error: string | null
  expanded: boolean
  inited: boolean
  muted: boolean
  playing: boolean
  playlistExpanded: boolean
  playlists: IPlaylist[]
}

export const ADD_PLAYLIST = 'ADD_PLAYLIST'
export const NEXT_TRACK = 'NEXT_TRACK'
export const PAUSE_PLAYER = 'PAUSE_PLAYER'
export const PLAY_TRACK = 'PLAY_TRACK'
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK'
export const REPLACE_PLAYLIST = 'REPLACE_PLAYLIST'
export const SEEK_PLAYER = 'SEEK_PLAYER'
export const SET_PLAYER_ACTUALLY_PLAYING = 'SET_PLAYER_ACTUALLY_PLAYING'
export const SET_PLAYER_ALREADY_OPENED = 'SET_PLAYER_ALREADY_OPENED'
export const SET_PLAYER_ERROR = 'SET_PLAYER_ERROR'
export const SET_PLAYER_EXPANDED = 'SET_PLAYER_EXPANDED'
export const SET_PLAYER_INSTANCE = 'SET_PLAYER_INSTANCE'
export const SET_PLAYER_PLAYLIST = 'SET_PLAYER_PLAYLIST'
export const SET_PLAYER_PLAYLIST_EXPANDED = 'SET_PLAYER_PLAYLIST_EXPANDED'
export const TRACK_ENDED = 'TRACK_ENDED'
export const UNPAUSE_PLAYER = 'UNPAUSE_PLAYER'

/* TODO: These are not alphabetised, make a linter for this */
export interface IAddPlaylist extends AnyAction {
  type: typeof ADD_PLAYLIST
  payload: Partial<IPlaylist>
}

export interface IPlayTrack extends AnyAction {
  type: typeof PLAY_TRACK
  payload: ITrack
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

export interface ISetPlayerActuallyPlaying extends AnyAction {
  type: typeof SET_PLAYER_ACTUALLY_PLAYING
  payload: boolean
}

export interface ISetPlayerAlreadyOpened extends AnyAction {
  type: typeof SET_PLAYER_ALREADY_OPENED
  payload: boolean
}

export interface ISetPlayerError extends AnyAction {
  type: typeof SET_PLAYER_ERROR
  payload: string | null
}

export interface ISetPlayerExpanded extends AnyAction {
  type: typeof SET_PLAYER_EXPANDED
  payload: boolean
}

export interface ISetPlayerInstance extends AnyAction {
  type: typeof SET_PLAYER_INSTANCE
  payload: null
}

export interface ISetPlayerPlaylist extends AnyAction {
  type: typeof SET_PLAYER_PLAYLIST
  payload: number
}

export interface ISetPlayerPlaylistExpanded extends AnyAction {
  type: typeof SET_PLAYER_PLAYLIST_EXPANDED
  payload: boolean
}

export interface IPreviousTrack extends AnyAction {
  type: typeof PREVIOUS_TRACK
  payload: null
}

export interface ITrackEnded extends AnyAction {
  type: typeof TRACK_ENDED
  payload: null
}

export interface IUnpausePlayer extends AnyAction {
  type: typeof UNPAUSE_PLAYER
  payload: null
}

export type Action =
  IAddPlaylist
  | INextTrack
  | IPausePlayer
  | IPlayTrack
  | IPreviousTrack
  | IReplacePlaylist
  | ISeekPlayer
  | ISetPlayerActuallyPlaying
  | ISetPlayerAlreadyOpened
  | ISetPlayerError
  | ISetPlayerExpanded
  | ISetPlayerInstance
  | ISetPlayerPlaylist
  | ISetPlayerPlaylistExpanded
  | ITrackEnded
  | IUnpausePlayer

export {
  addPlaylist,
  nextTrack,
  pausePlayer,
  playTrack,
  previousTrack,
  replacePlaylist,
  seekPlayer,
  setPlayerActuallyPlaying,
  setPlayerAlreadyOpened,
  setPlayerError,
  setPlayerExpanded,
  setPlayerInstance,
  setPlayerPlaylist,
  setPlayerPlaylistExpanded,
  trackEnded,
  unpausePlayer,
} from './actions'


export {
  Album,
  Albums,
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
  nextTrackSaga,
  pausePlayerSaga,
  playPlayerSaga,
  previousTrackSaga,
  seekPlayerSaga,
  setPlayerInstanceSaga,
  trackEndedSaga,
  unpausePlayerSaga,
} from './sagas'

export {
  getNextTrack,
  getPlayerInstance,
  getPreviousTrack,
} from './functions'
