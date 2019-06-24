// ================================================================================
// Types
// ================================================================================
type MainMode =
    'arranger'
  | 'editor'
  | 'project'

type WaveformData = number[]

interface IChannelData {
  leftChannelData: Float32Array
  rightChannelData: Float32Array
}

const SET_CHANNEL_DATA = 'SET_CHANNEL_DATA' // TODO: Doesn't belong here
const SET_MAIN_MODE = 'SET_MAIN_MODE'
const SET_WAVEFORM_DATA = 'SET_WAVEFORM_DATA' // TODO: Doesn't belong here
const SET_WAVEFORM_LOADING = 'SET_WAVEFORM_LOADING' // TODO: Doesn't belong here
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

interface IState {
  channelData: IChannelData
  mainMode: MainMode
  sidebarOpen: boolean
  waveformData: WaveformData,
  waveformLoading: boolean
}

// ================================================================================
// Action types
// ================================================================================
interface ISetChannelData extends IAction {
  type: typeof SET_CHANNEL_DATA
  payload: IChannelData
}

interface ISetMainMode extends IAction {
  type: typeof SET_MAIN_MODE
  payload: MainMode
}

interface ISetWaveformData extends IAction {
  type: typeof SET_WAVEFORM_DATA
  payload: WaveformData
}

interface ISetWaveformLoading extends IAction {
  type: typeof SET_WAVEFORM_LOADING
  payload: boolean
}

interface IToggleSidebar extends IAction {
  type: typeof TOGGLE_SIDEBAR
  payload: null
}

type ActionType =
    ISetChannelData
  | ISetMainMode
  | ISetWaveformData
  | ISetWaveformLoading
  | IToggleSidebar

// ================================================================================
// Actions
// ================================================================================
const toggleSidebar = (): ActionType => ({
  type: TOGGLE_SIDEBAR,
  payload: null,
})

const setMainMode = (mainMode: MainMode): ActionType => ({
  type: SET_MAIN_MODE,
  payload: mainMode,
})

const setChannelData = (channelData: IChannelData): ActionType => ({
  type: SET_CHANNEL_DATA,
  payload: channelData,
})

const setWaveformData = (waveformData: WaveformData): ActionType => ({
  type: SET_WAVEFORM_DATA,
  payload: waveformData,
})

const setWaveformLoading = (waveformLoading: boolean): ActionType => ({
  type: SET_WAVEFORM_LOADING,
  payload: waveformLoading,
})

// ================================================================================
// Reducer
// ================================================================================
const initialState: IState = {
  channelData: { leftChannelData: new Float32Array(), rightChannelData: new Float32Array() },
  mainMode: 'project',
  sidebarOpen: false,
  waveformData: [],
  waveformLoading: false,
}

const reducer = (
  state: IState = initialState,
  {type, payload}: IAction,
): IState => {
  switch (type) {
    case SET_CHANNEL_DATA:
      return { ...state, channelData: payload }

    case SET_MAIN_MODE:
      return { ...state, mainMode: payload }

    case SET_WAVEFORM_DATA:
      return { ...state, waveformData: payload }

    case SET_WAVEFORM_LOADING:
      return { ...state, waveformLoading: payload }

    case TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen }

    default:
      return state
  }
}

export {
  SET_CHANNEL_DATA,
  SET_MAIN_MODE,
  SET_WAVEFORM_DATA,
  SET_WAVEFORM_LOADING,
  TOGGLE_SIDEBAR,

  toggleSidebar,
  setMainMode,
  setChannelData,
  setWaveformData,
  setWaveformLoading,

  initialState,

  reducer,
}
