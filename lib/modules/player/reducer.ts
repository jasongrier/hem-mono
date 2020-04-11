import { AnyAction } from 'redux'
import produce from 'immer'
import {
  MUTE_PLAYER,
  PAUSE_PLAYER,
  PLAY_PLAYER,
  SET_PLAYER_INSTANCE,
  UNMUTE_PLAYER,

  IState,
  UNPAUSE_PLAYER,
} from './index'

const initialState: IState = {
  currentTrackId: null,
  currentTrackType: null,
  currentTrackResource: null,
  inited: false,
  muted: true,
  playing: false,
  playerInstance: null,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case MUTE_PLAYER: {
      return produce(state, draftState => {
        draftState.muted = true
      })
    }

    case PAUSE_PLAYER: {
      return produce(state, draftState => {
        draftState.playing = false
      })
    }

    case PLAY_PLAYER: {
      return produce(state, draftState => {
        draftState.playing = true
        draftState.currentTrackId = payload.id
        draftState.currentTrackType = payload.type
        draftState.currentTrackResource = payload.resource
      })
    }

    case SET_PLAYER_INSTANCE: {
      return produce(state, draftState => {
        draftState.playerInstance = payload
      })
    }

    case UNMUTE_PLAYER: {
      return produce(state, draftState => {
        draftState.muted = false
      })
    }

    case UNPAUSE_PLAYER: {
      return produce(state, draftState => {
        draftState.playing = true
      })
    }

    default:
      return state
  }
}

export {
  initialState,
  reducer,
}
