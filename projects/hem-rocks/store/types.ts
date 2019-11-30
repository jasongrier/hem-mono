import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

// TODO: How to get around putting this in every project??
export type ThunkResult<R> = ThunkAction<R, IState, undefined, Action>

export interface IState {
  playerPlaying: boolean
  playerVolume: number
  playerSoundUrl: string
}

export const PLAYER_PLAY = 'PLAYER_PLAY'
export const PLAYER_PAUSE = 'PLAYER_PAUSE'
export const PLAYER_SET_SOUND_URL = 'PLAYER_SET_SOUND_URL'
export const PLAYER_SET_VOLUME = 'PLAYER_SET_VOLUME'

export interface IPlayerPlay extends AnyAction {
  type: typeof PLAYER_PLAY
  payload: null
}

export interface IPlayerPause extends AnyAction {
  type: typeof PLAYER_PAUSE
  payload: null
}

export interface IPlayerSetSoundUrl extends AnyAction {
  type: typeof PLAYER_SET_SOUND_URL
  payload: string
}

export interface IPlayerSetVolume extends AnyAction {
  type: typeof PLAYER_SET_VOLUME
  payload: number
}

export type Action =
  IPlayerPlay
  | IPlayerPause
  | IPlayerSetSoundUrl
  | IPlayerSetVolume
