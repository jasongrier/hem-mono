import { IChannelData, IState, WaveformData } from './types'

// ================================================================================
// Action types
// ================================================================================
const SET_CHANNEL_DATA = 'SET_CHANNEL_DATA' // TODO: Doesn't belong here
const SET_WAVEFORM_DATA = 'SET_WAVEFORM_DATA' // TODO: Doesn't belong here
const SET_WAVEFORM_LOADING = 'SET_WAVEFORM_LOADING' // TODO: Doesn't belong here

interface ISetChannelData extends IAction {
  type: typeof SET_CHANNEL_DATA
  payload: IChannelData
}

interface ISetWaveformData extends IAction {
  type: typeof SET_WAVEFORM_DATA
  payload: WaveformData
}

interface ISetWaveformLoading extends IAction {
  type: typeof SET_WAVEFORM_LOADING
  payload: boolean
}

type ActionType =
    ISetChannelData
  | ISetWaveformData
  | ISetWaveformLoading

// ================================================================================
// Actions
// ================================================================================
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
  waveformData: [],
  waveformLoading: false,
}

const reducer = (
  state: IState = initialState,
  {type, payload}: IAction,
): IState => {
  console.log(type, payload)
  switch (type) {
    case SET_CHANNEL_DATA:
      return { ...state, channelData: payload }

    case SET_WAVEFORM_DATA:
      return { ...state, waveformData: payload }

    case SET_WAVEFORM_LOADING:
      return { ...state, waveformLoading: payload }

    default:
      return state
  }
}

export {
  setChannelData,
  setWaveformData,
  setWaveformLoading,

  initialState,

  reducer,
}
