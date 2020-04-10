import { AnyAction } from 'redux'
import produce from 'immer'
import {
  LOAD,
  MUTE,
  PAUSE,
  PLAY,
  UNMUTE,

  IState,
} from './index'

const initialState: IState = {
  currentTrackId: null,
  muted: true,
  playing: false,
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case LOAD: {
      return produce(state, draftState => {
        draftState.currentTrackId = payload
      })
    }

    case MUTE: {
      return produce(state, draftState => {
        draftState.muted = payload
      })
    }

    case PAUSE: {
      return produce(state, draftState => {
        draftState.playing = false
      })
    }

    case PLAY: {
      return produce(state, draftState => {
        draftState.playing = true
      })
    }

    case UNMUTE: {
      return produce(state, draftState => {
        draftState.muted = true
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
