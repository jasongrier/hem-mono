import { AnyAction } from 'redux'
import produce from 'immer'
import {
  MUTE_PLAYER,
  NEXT_TRACK,
  PAUSE_PLAYER,
  PLAY_PLAYER,
  PREVIOUS_TRACK,
  SET_PLAYER_PLAYLIST,
  TRACK_ENDED,
  UNMUTE_PLAYER,
  UNPAUSE_PLAYER,

  IState,
} from './index'

const initialState: IState = {
  currentTrackAttribution: null,
  currentTrackId: null,
  currentTrackResource: null,
  currentTrackType: null,
  inited: false,
  muted: true,
  playing: false,
  playlist: [],
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

    case NEXT_TRACK: {
      return state
    }

    case PAUSE_PLAYER: {
      return produce(state, draftState => {
        draftState.playing = false
      })
    }

    case PLAY_PLAYER: {
      return produce(state, draftState => {
        draftState.playing = true
        draftState.currentTrackAttribution = payload.attribution
        draftState.currentTrackId = payload.id
        draftState.currentTrackType = payload.type
        draftState.currentTrackResource = payload.resource
      })
    }

    case SET_PLAYER_PLAYLIST: {
      return produce(state, draftState => {
        draftState.playlist = payload
      })
    }

    case PREVIOUS_TRACK: {
      return state
    }

    case TRACK_ENDED: {
      return state
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
