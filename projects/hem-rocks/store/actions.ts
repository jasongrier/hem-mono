import {
  CAROUSEL_NEXT,
  CAROUSEL_PREVIOUS,
  CAROUSEL_SET_INDEX,
  LOG_IN,
  LOG_IN_RESET,
  LOG_OUT,
  PLAYER_PAUSE,
  PLAYER_PLAY,
  PLAYER_SET_VOLUME,
  PLAYER_TOGGLE_MUTED,
  PLAYER_TOGGLE_PLAYING,

  Action,
} from './types'

const carouselNext = (): Action => ({
  type: CAROUSEL_NEXT,
  payload: null,
})

const carouselPrevious = (): Action => ({
  type: CAROUSEL_PREVIOUS,
  payload: null,
})

const carouselSetIndex = (index: number): Action => ({
  type: CAROUSEL_SET_INDEX,
  payload: index,
})

// TODO: Use the appropriate action types
const logIn = (password: string): Action => ({
  type: LOG_IN,
  payload: password,
})

const logInReset = (): Action => ({
  type: LOG_IN_RESET,
  payload: null,
})

const logOut = (): Action => ({
  type: LOG_OUT,
  payload: null,
})

const playerPause = (): Action => ({
  type: PLAYER_PAUSE,
  payload: null,
})

const playerPlay = (): Action => ({
  type: PLAYER_PLAY,
  payload: null,
})

const playerSetVolume = (volume: number): Action => ({
  type: PLAYER_SET_VOLUME,
  payload: volume,
})

const playerToggleMuted = (): Action => ({
  type: PLAYER_TOGGLE_MUTED,
  payload: null,
})

const playerTogglePlaying = (): Action => ({
  type: PLAYER_TOGGLE_PLAYING,
  payload: null,
})

export {
  carouselNext,
  carouselPrevious,
  carouselSetIndex,
  logIn,
  logInReset,
  logOut,
  playerPause,
  playerPlay,
  playerSetVolume,
  playerToggleMuted,
  playerTogglePlaying,
}
