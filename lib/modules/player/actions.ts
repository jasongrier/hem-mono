import {
  MUTE_PLAYER,
  PAUSE_PLAYER,
  PLAY_PLAYER,
  SET_PLAYER_INSTANCE,
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

const setPlayerInstance = (player: any): Action => ({
  type: SET_PLAYER_INSTANCE,
  payload: player,
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
  setPlayerInstance,
  unmutePlayer,
  unpausePlayer,
}
