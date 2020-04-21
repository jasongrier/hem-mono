import {
  MUTE_PLAYER,
  NEXT_TRACK,
  PAUSE_PLAYER,
  CUE_TRACK,
  PREVIOUS_TRACK,
  SET_PLAYER_ACTUALLY_PLAYING,
  SET_PLAYER_PLAYLIST,
  TRACK_ENDED,
  UNMUTE_PLAYER,
  UNPAUSE_PLAYER,

  Action,

  ITrack,
} from './index'

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

const setPlayerActuallyPlaying = (actuallyPlaying: boolean): Action => ({
  type: SET_PLAYER_ACTUALLY_PLAYING,
  payload: actuallyPlaying,
})

const setPlayerPlaylist = (playlist: ITrack[]): Action => ({
  type: SET_PLAYER_PLAYLIST,
  payload: playlist,
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
  cueTrack,
  mutePlayer,
  nextTrack,
  pausePlayer,
  previousTrack,
  setPlayerActuallyPlaying,
  setPlayerPlaylist,
  trackEnded,
  unmutePlayer,
  unpausePlayer,
}
