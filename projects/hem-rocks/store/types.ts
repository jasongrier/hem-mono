import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

// TODO: How to get around putting this in every project??
export type ThunkResult<R> = ThunkAction<R, IState, undefined, Action>

export interface ICarouselItem {
  buttonText: string
  description: string
  headline: string
  packId: string
  soundUrl: string
  subHeadline: string
}

export interface IState {
  carouselIndex: number
  carouselItems: ICarouselItem[]
  playerPlaying: boolean
  playerSoundUrl: string
  playerVolume: number
}

export const CAROUSEL_NEXT = 'CAROUSEL_NEXT'
export const CAROUSEL_PREVIOUS = 'CAROUSEL_PREVIOUS'
export const CAROUSEL_SET_INDEX = 'CAROUSEL_SET_INDEX'
export const PLAYER_PAUSE = 'PLAYER_PAUSE'
export const PLAYER_PLAY = 'PLAYER_PLAY'
export const PLAYER_SET_SOUND = 'PLAYER_SET_SOUND'
export const PLAYER_SET_VOLUME = 'PLAYER_SET_VOLUME'
export const PLAYER_TOGGLE_MUTED = 'PLAYER_TOGGLE_MUTED'
export const PLAYER_TOGGLE_PLAYING = 'PLAYER_TOGGLE_PLAYING'

export interface ICarouselNext extends AnyAction {
  type: typeof CAROUSEL_NEXT
  payload: null
}

export interface ICarouselPrevious extends AnyAction {
  type: typeof CAROUSEL_PREVIOUS
  payload: null
}

export interface ICarouselSetIndex extends AnyAction {
  type: typeof CAROUSEL_SET_INDEX
  payload: number
}

export interface IPlayerPause extends AnyAction {
  type: typeof PLAYER_PAUSE
  payload: null
}

export interface IPlayerPlay extends AnyAction {
  type: typeof PLAYER_PLAY
  payload: null
}

export interface IPlayerSetVolume extends AnyAction {
  type: typeof PLAYER_SET_VOLUME
  payload: number
}

export interface IPlayerToggleMuted extends AnyAction {
  type: typeof PLAYER_TOGGLE_MUTED
  payload: null
}

export interface IPlayerTogglePlaying extends AnyAction {
  type: typeof PLAYER_TOGGLE_PLAYING
  payload: null
}

export type Action =
  ICarouselNext
  | ICarouselPrevious
  | IPlayerPause
  | IPlayerPlay
  | IPlayerSetVolume
  | ICarouselSetIndex
  | IPlayerToggleMuted
  | IPlayerTogglePlaying
