import {
  ADD_PLAYLIST,
  MUTE_PLAYER,
  NEXT_TRACK,
  PAUSE_PLAYER,
  CUE_TRACK,
  PREVIOUS_TRACK,
  REPLACE_PLAYLIST,
  SEEK_PLAYER,
  SET_PLAYER_ERROR,
  SET_PLAYER_ACTUALLY_PLAYING,
  SET_PLAYER_MESSAGE,
  SET_PLAYER_PLAYLIST,
  TRACK_ENDED,
  UNMUTE_PLAYER,
  UNPAUSE_PLAYER,

  Action,

  IPlaylist,
  ITrack,
} from './index'

const addPlaylist = (playlist: Partial<IPlaylist>): Action => ({
  type: ADD_PLAYLIST,
  payload: playlist,
})

const cueTrack = (track: ITrack, andPlay: boolean): Action => ({
  type: CUE_TRACK,
  payload: { track, andPlay },
})

const mutePlayer = (): Action => ({
  type: MUTE_PLAYER,
  payload: null,
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

const setPlayerError = (error: string | null): Action => ({
  type: SET_PLAYER_ERROR,
  payload: error,
})

const setPlayerActuallyPlaying = (actuallyPlaying: boolean): Action => ({
  type: SET_PLAYER_ACTUALLY_PLAYING,
  payload: actuallyPlaying,
})

const setPlayerMessage = (message: string | null): Action => ({
  type: SET_PLAYER_MESSAGE,
  payload: message,
})

const setPlayerPlaylist = (number: number): Action => ({
  type: SET_PLAYER_PLAYLIST,
  payload: number,
})

const trackEnded = (): Action => ({
  type: TRACK_ENDED,
  payload: null,
})

const unmutePlayer = (): Action => ({
  type: UNMUTE_PLAYER,
  payload: null,
})

const unpausePlayer = (): Action => ({
  type: UNPAUSE_PLAYER,
  payload: null,
})

export {
  addPlaylist,
  cueTrack,
  mutePlayer,
  nextTrack,
  pausePlayer,
  previousTrack,
  replacePlaylist,
  seekPlayer,
  setPlayerError,
  setPlayerActuallyPlaying,
  setPlayerMessage,
  setPlayerPlaylist,
  trackEnded,
  unmutePlayer,
  unpausePlayer,
}
