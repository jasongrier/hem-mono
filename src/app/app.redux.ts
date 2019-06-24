type mainModes =
  'arranger'
| 'editor'
| 'project'

interface IState {
  channelData: { leftChannelData: number[], rightChannelData: number[] }
  mainMode: mainModes
  sidebarOpen: boolean
  waveformData: number[],
  waveformLoading: boolean
}

const initialState: IState = {
  channelData: { leftChannelData: [], rightChannelData: [] },
  mainMode: 'project',
  sidebarOpen: false,
  waveformData: [],
  waveformLoading: false,
}

const appReducer = (state: IState, {type, payload}: { type: string, payload: any }) => {
  switch (type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }

    case 'SET_MAIN_MODE':
      return { ...state, mainMode: payload }

    case 'SET_CHANNEL_DATA':
      return { ...state, channelData: payload }

    case 'SET_WAVEFORM_DATA':
      return { ...state, waveformData: payload }

    case 'SET_WAVEFORM_LOADING':
      return { ...state, waveformLoading: payload }

    default:
      return state
  }
}

export { IState, initialState, appReducer }