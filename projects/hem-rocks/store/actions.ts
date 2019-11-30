import {
  PLAYER_PLAY,
  PLAYER_PAUSE,
  PLAYER_SET_SOUND_URL,
  PLAYER_SET_VOLUME,

  ThunkResult,
} from './types'

const mockPlayer = {
  load: async (url: string) => {},
  pause: async () => {},
  play: async () => {},
  setVolume: async (volume: number) => {},
}

const playerPause = (): ThunkResult<void> =>
  async (dispatch) => {
    await mockPlayer.pause()
    dispatch({ type: PLAYER_PAUSE, payload: null })
  }

const playerPlay = (): ThunkResult<void> =>
  async (dispatch) => {
    await mockPlayer.play()
    dispatch({ type: PLAYER_PLAY, payload: null })
  }

const playerSetSoundUrl = (url: string): ThunkResult<void> =>
  async (dispatch, getState) => {
    const { playerPlaying } = (getState() as any).app
    const playerWasPlaying = playerPlaying

    if (playerPlaying) {
      dispatch({ type: PLAYER_PAUSE, payload: null })
    }

    await mockPlayer.load(url)

    dispatch({ type: PLAYER_SET_SOUND_URL, payload: url })

    if (playerWasPlaying) {
      dispatch({ type: PLAYER_PLAY, payload: null })
    }
  }

const playerSetVolume = (volume: number): ThunkResult<void> => // TODO: Should be ThunkResult<IActionType>, everywhere
  async (dispatch) => {
    await mockPlayer.setVolume(volume)
    dispatch({ type: PLAYER_SET_VOLUME, payload: volume })
  }

export {
  playerPause,
  playerPlay,
  playerSetSoundUrl,
  playerSetVolume,
}
