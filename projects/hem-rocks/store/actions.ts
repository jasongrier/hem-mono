import {
  CAROUSEL_NEXT,
  CAROUSEL_PREVIOUS,
  CAROUSEL_SET_INDEX,
  PLAYER_PAUSE,
  PLAYER_PLAY,
  PLAYER_SET_VOLUME,
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

const playerTogglePlaying = (): Action => ({
  type: PLAYER_TOGGLE_PLAYING,
  payload: null,
})

export {
  carouselNext,
  carouselPrevious,
  carouselSetIndex,
  playerPause,
  playerPlay,
  playerSetVolume,
  playerTogglePlaying,
}
