import { AnyAction } from 'redux'
import produce from 'immer'
import uuid from 'uuid/v1'
import {
  ADD_PLAYLIST,
  CUE_TRACK,
  MUTE_PLAYER,
  NEXT_TRACK,
  PAUSE_PLAYER,
  PREVIOUS_TRACK,
  REPLACE_PLAYLIST,
  SEEK_PLAYER,
  SET_PLAYER_ACTUALLY_PLAYING,
  SET_PLAYER_PLAYLIST,
  TRACK_ENDED,
  UNMUTE_PLAYER,
  UNPAUSE_PLAYER,

  IState,

  IPlaylist,
} from './index'

const initialState: IState = {
  actuallyPlaying: false,
  currentTrack: null,
  currentPlaylist: null,
  inited: false,
  muted: true,
  playing: false,
  playlists: [],
}

const reducer = (
  state: IState = initialState,
  { type, payload }: AnyAction,
): IState => {
  switch (type) {
    case ADD_PLAYLIST: {
      return produce(state, draftState => {
        draftState.playlists.push({
          id: uuid(),
          ...payload.playlist
        })
      })
    }

    case REPLACE_PLAYLIST: {
      return produce(state, draftState => {
        draftState.playlists[payload.number] = {
          id: uuid(),
          ...payload.playlist
        }
      })
    }

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
        draftState.currentTrack = payload.track
      })
    }

    case SEEK_PLAYER: {
      return state
    }

    case SET_PLAYER_ACTUALLY_PLAYING: {
      return produce(state, draftState => {
        draftState.actuallyPlaying = payload
      })
    }

    case SET_PLAYER_PLAYLIST: {
      return produce(state, draftState => {
        if (draftState.playlists[payload]) {
          draftState.currentPlaylist = draftState.playlists[payload]
        }
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
