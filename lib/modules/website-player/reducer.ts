import { AnyAction } from 'redux'
import produce from 'immer'
import uuid from 'uuid/v1'
import {
  ADD_PLAYLIST,
  NEXT_TRACK,
  PAUSE_PLAYER,
  PLAY_TRACK,
  PREVIOUS_TRACK,
  REPLACE_PLAYLIST,
  SEEK_PLAYER,
  SET_PLAYER_ACTUALLY_PLAYING,
  SET_PLAYER_ALREADY_OPENED,
  SET_PLAYER_ERROR,
  SET_PLAYER_EXPANDED,
  SET_PLAYER_INSTANCE,
  SET_PLAYER_PLAYLIST_EXPANDED,
  SET_PLAYER_PLAYLIST,
  TRACK_ENDED,
  UNPAUSE_PLAYER,

  IState,
} from './index'

const initialState: IState = {
  actuallyPlaying: false,
  alreadyOpened: false,
  currentTrack: null,
  currentPlaylist: null,
  error: null,
  expanded: false,
  inited: false,
  muted: true,
  playing: false,
  playlistExpanded: false,
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

    case NEXT_TRACK: {
      return state
    }

    case PAUSE_PLAYER: {
      return produce(state, draftState => {
        draftState.playing = false
      })
    }

    case PLAY_TRACK: {
      return produce(state, draftState => {
        draftState.playing = true
        draftState.currentTrack = payload
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

    case SET_PLAYER_ALREADY_OPENED: {
      return produce(state, draftState => {
        draftState.alreadyOpened = payload
      })
    }

    case SET_PLAYER_ERROR: {
      return produce(state, draftState => {
        draftState.error = payload

        if (draftState.error) {
          draftState.currentTrack = null
        }
      })
    }

    case SET_PLAYER_EXPANDED: {
      return produce(state, draftState => {
        draftState.expanded = payload
      })
    }

    case SET_PLAYER_INSTANCE: {
      return state
    }

    case SET_PLAYER_PLAYLIST: {
      return produce(state, draftState => {
        if (draftState.playlists[payload]) {
          draftState.currentPlaylist = draftState.playlists[payload]
        }
      })
    }

    case SET_PLAYER_PLAYLIST_EXPANDED: {
      return produce(state, draftState => {
        draftState.playlistExpanded = payload
      })
    }

    case PREVIOUS_TRACK: {
      return state
    }

    case TRACK_ENDED: {
      return state
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
