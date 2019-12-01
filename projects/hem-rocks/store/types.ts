import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

// TODO: How to get around putting this in every project??
export type ThunkResult<R> = ThunkAction<R, IState, undefined, Action>

export interface IPlayerSound {
  id: string
  title: string
}

export interface IState {
  playerPlaying: boolean
  playerSoundUrl: string
  playerVolume: number
}

export const PLAYER_PAUSE = 'PLAYER_PAUSE'
export const PLAYER_PLAY = 'PLAYER_PLAY'
export const PLAYER_SET_SOUND = 'PLAYER_SET_SOUND'
export const PLAYER_SET_VOLUME = 'PLAYER_SET_VOLUME'

export interface IPlayerPause extends AnyAction {
  type: typeof PLAYER_PAUSE
  payload: null
}

export interface IPlayerPlay extends AnyAction {
  type: typeof PLAYER_PLAY
  payload: null
}

export interface IPlayerSetSound extends AnyAction {
  type: typeof PLAYER_SET_SOUND
  payload: IPlayerSound
}

export interface IPlayerSetVolume extends AnyAction {
  type: typeof PLAYER_SET_VOLUME
  payload: number
}

export type Action =
  IPlayerPause
  | IPlayerPlay
  | IPlayerSetSound
  | IPlayerSetVolume
