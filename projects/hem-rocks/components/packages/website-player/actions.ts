import {
  HEM_WEBSITE_PLAYER_INIT,
  HEM_WEBSITE_PLAYER_PAUSE,
  HEM_WEBSITE_PLAYER_PLAY,
  HEM_WEBSITE_PLAYER_SET_VOLUME,
  HEM_WEBSITE_PLAYER_TOGGLE_MUTED,
  HEM_WEBSITE_PLAYER_TOGGLE_PLAYING,

  Action,
} from './types'

const init = (): Action => ({
  type: HEM_WEBSITE_PLAYER_INIT,
  payload: null,
})

const pause = (): Action => ({
  type: HEM_WEBSITE_PLAYER_PAUSE,
  payload: null,
})

const play = (): Action => ({
  type: HEM_WEBSITE_PLAYER_PLAY,
  payload: null,
})

const setVolume = (volume: number): Action => ({
  type: HEM_WEBSITE_PLAYER_SET_VOLUME,
  payload: volume,
})

const toggleMuted = (): Action => ({
  type: HEM_WEBSITE_PLAYER_TOGGLE_MUTED,
  payload: null,
})

const togglePlaying = (): Action => ({
  type: HEM_WEBSITE_PLAYER_TOGGLE_PLAYING,
  payload: null,
})

export {
  init,
  pause,
  play,
  setVolume,
  toggleMuted,
  togglePlaying,
}
