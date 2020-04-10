import { AnyAction } from 'redux'
import {
  LOAD,
  MUTE,
  PAUSE,
  PLAY,
  UNMUTE,

  Action,
} from './index'

const load = (trackId: string): Action => ({
  type: LOAD,
  payload: trackId,
})

const mute = (): Action => ({
  type: MUTE,
  payload: null,
})

const pause = (): Action => ({
  type: PAUSE,
  payload: null,
})

const play = (): Action => ({
  type: PLAY,
  payload: null,
})

const unmute = (): Action => ({
  type: UNMUTE,
  payload: null,
})

export {
  load,
  mute,
  pause,
  play,
  unmute
}
