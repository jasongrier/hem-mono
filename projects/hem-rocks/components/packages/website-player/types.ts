import { AnyAction } from 'redux'

export interface IState {
  playing: boolean
  soundUrl: string
  volume: number
}

export const HEM_WEBSITE_PLAYER_INIT = 'HEM_WEBSITE_PLAYER_INIT'
export const HEM_WEBSITE_PLAYER_PAUSE = 'HEM_WEBSITE_PLAYER_PAUSE'
export const HEM_WEBSITE_PLAYER_PLAY = 'HEM_WEBSITE_PLAYER_PLAY'
export const HEM_WEBSITE_PLAYER_SET_SOUND = 'HEM_WEBSITE_PLAYER_SET_SOUND'
export const HEM_WEBSITE_PLAYER_SET_VOLUME = 'HEM_WEBSITE_PLAYER_SET_VOLUME'
export const HEM_WEBSITE_PLAYER_TOGGLE_MUTED = 'HEM_WEBSITE_PLAYER_TOGGLE_MUTED'
export const HEM_WEBSITE_PLAYER_TOGGLE_PLAYING = 'HEM_WEBSITE_PLAYER_TOGGLE_PLAYING'

export interface IInit extends AnyAction {
  type: typeof HEM_WEBSITE_PLAYER_INIT
  payload: null
}

export interface IPause extends AnyAction {
  type: typeof HEM_WEBSITE_PLAYER_PAUSE
  payload: null
}

export interface IPlay extends AnyAction {
  type: typeof HEM_WEBSITE_PLAYER_PLAY
  payload: null
}

export interface ISetVolume extends AnyAction {
  type: typeof HEM_WEBSITE_PLAYER_SET_VOLUME
  payload: number
}

export interface IToggleMuted extends AnyAction {
  type: typeof HEM_WEBSITE_PLAYER_TOGGLE_MUTED
  payload: null
}

export interface ITogglePlaying extends AnyAction {
  type: typeof HEM_WEBSITE_PLAYER_TOGGLE_PLAYING
  payload: null
}

export type Action =
  IInit
  | IPause
  | IPlay
  | ISetVolume
  | IToggleMuted
  | ITogglePlaying
