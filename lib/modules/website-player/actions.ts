import {
  ADD_PLAYLIST,
  NEXT_TRACK,
  PAUSE_PLAYER,
  PLAY_TRACK,
  PREVIOUS_TRACK,
  REPLACE_PLAYLIST,
  SEEK_PLAYER,
  SET_PLAYER_ACTUALLY_PLAYING,
  SET_PLAYER_ALREADY_OPENED,
  SET_PLAYER_ERROR,
  SET_PLAYER_EXPANDED,
  SET_PLAYER_INSTANCE,
  SET_PLAYER_PLAYLIST,
  SET_PLAYER_PLAYLIST_EXPANDED,
  TRACK_ENDED,
  UNPAUSE_PLAYER,

  Action,

  IPlaylist,
  ITrack,
} from './index'

const addPlaylist = (playlist: Partial<IPlaylist>): Action => ({
  type: ADD_PLAYLIST,
  payload: playlist,
})

const playTrack = (track: ITrack): Action => ({
  type: PLAY_TRACK,
  payload: track,
})

const nextTrack = (): Action => ({
  type: NEXT_TRACK,
  payload: null,
})

const pausePlayer = (): Action => ({
  type: PAUSE_PLAYER,
  payload: null,
})

const previousTrack = (): Action => ({
  type: PREVIOUS_TRACK,
  payload: null,
})

const replacePlaylist = (number: number, playlist: Partial<IPlaylist>): Action => ({
  type: REPLACE_PLAYLIST,
  payload: { number, playlist },
})

const seekPlayer = (percent: number): Action => ({
  type: SEEK_PLAYER,
  payload: percent,
})

const setPlayerActuallyPlaying = (actuallyPlaying: boolean): Action => ({
  type: SET_PLAYER_ACTUALLY_PLAYING,
  payload: actuallyPlaying,
})

const setPlayerAlreadyOpened = (alreadyOpened: boolean): Action => ({
  type: SET_PLAYER_ALREADY_OPENED,
  payload: alreadyOpened,
})

const setPlayerError = (error: string | null): Action => ({
  type: SET_PLAYER_ERROR,
  payload: error,
})

const setPlayerExpanded = (setPlayerExpanded: boolean): Action => ({
  type: SET_PLAYER_EXPANDED,
  payload: setPlayerExpanded,
})

const setPlayerInstance = (): Action => ({
  type: SET_PLAYER_INSTANCE,
  payload: null,
})

const setPlayerPlaylist = (number: number): Action => ({
  type: SET_PLAYER_PLAYLIST,
  payload: number,
})

const setPlayerPlaylistExpanded = (playerPlaylistExpanded: boolean): Action => ({
  type: SET_PLAYER_PLAYLIST_EXPANDED,
  payload: playerPlaylistExpanded,
})

const trackEnded = (): Action => ({
  type: TRACK_ENDED,
  payload: null,
})

const unpausePlayer = (): Action => ({
  type: UNPAUSE_PLAYER,
  payload: null,
})

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
}
