import { AnyAction } from 'redux'
import produce from 'immer'
import {
  CUE_TRACK,
  MUTE_PLAYER,
  NEXT_TRACK,
  PAUSE_PLAYER,
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

    case CUE_TRACK: {
      return produce(state, draftState => {
        draftState.playing = payload.andPlay
        draftState.currentTrackAttribution = payload.track.attribution
        draftState.currentTrackId = payload.track.id
        draftState.currentTrackType = payload.track.type
        draftState.currentTrackResource = payload.track.resource
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
