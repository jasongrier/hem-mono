import {
  MUTE_PLAYER,
  PAUSE_PLAYER,
  PLAY_PLAYER,
  SET_PLAYER_PLAYLIST,
  TRACK_ENDED,
  UNMUTE_PLAYER,
  UNPAUSE_PLAYER,

  Action,

  ITrack,
} from './index'

const mutePlayer = (): Action => ({
  type: MUTE_PLAYER,
  payload: null,
})

const pausePlayer = (): Action => ({
  type: PAUSE_PLAYER,
  payload: null,
})

const playPlayer = (track: ITrack): Action => ({
  type: PLAY_PLAYER,
  payload: track,
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
  mutePlayer,
  pausePlayer,
  playPlayer,
  setPlayerPlaylist,
  trackEnded,
  unmutePlayer,
  unpausePlayer,
}
