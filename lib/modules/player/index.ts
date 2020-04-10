import { AnyAction } from 'redux'

export interface IState {
  currentTrackId: string | null
  muted: boolean
  playing: boolean
}

export const LOAD = 'LOAD'
export const MUTE = 'MUTE'
export const PAUSE = 'PAUSE'
export const PLAY = 'PLAY'
export const UNMUTE = 'UNMUTE'

export interface ILoad extends AnyAction {
  type: typeof LOAD
  payload: string
}

export interface IMute extends AnyAction {
  type: typeof MUTE
  payload: null
}

export interface IPause extends AnyAction {
  type: typeof PAUSE
  payload: null
}

export interface IPlay extends AnyAction {
  type: typeof PLAY
  payload: null
}

export interface IUnmute extends AnyAction {
  type: typeof UNMUTE
  payload: null
}

export type Action =
  ILoad
  | IMute
  | IPause
  | IPlay
  |IUnmute


export { load, mute, pause, play, unmute } from './actions'

export { reducer as playerReducer } from './reducer'

export { MuteButton } from './components'
export { PauseButton } from './components'
export { PlayButton } from './components'
export { PlayPauseButton } from './components'
export { ProgressBar } from './components'
export { StopButton } from './components'
