import {
  PLAYER_PLAY,
  PLAYER_PAUSE,
  PLAYER_SET_SOUND,
  PLAYER_SET_VOLUME,

  Action,

  IPlayerSound,
} from './types'

const playerPause = (): Action => ({
  type: PLAYER_PAUSE,
  payload: null,
})

const playerPlay = (): Action => ({
  type: PLAYER_PLAY,
  payload: null,
})

const playerSetSound = (sound: IPlayerSound): Action => ({
  type: PLAYER_SET_SOUND,
  payload: sound,
})

const playerSetVolume = (volume: number): Action => ({
  type: PLAYER_SET_VOLUME,
  payload: volume,
})

export {
  playerPause,
  playerPlay,
  playerSetSound,
  playerSetVolume,
}
