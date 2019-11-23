import { AnyAction } from 'redux'

export interface ISlSoundPreset {
  id: string
  title: string
}

export interface ISlSound {
  id: string
  presets: ISlSoundPreset[]
  title: string
}

export interface IState {
  slSounds: ISlSound[]
}

export const SOME_ACTION = 'SOME_ACTION'

export interface ISomeAction extends AnyAction {
  type: typeof SOME_ACTION
  payload: null
}

export type Action = ISomeAction
