import {
  SET_CHANNEL_DATA,
  SET_WAVEFORM_DATA,
  SET_WAVEFORM_BUSY,

  IChannelData,
  IState,

  Action,
  WaveformData,
} from './types'
import { ThunkAction } from 'redux-thunk'
import getChannelData from '../audio/get-channel-data'

// ================================================================================
// Actions
// ================================================================================
const setChannelData = (channelData: IChannelData): Action => ({
  type: SET_CHANNEL_DATA,
  payload: channelData,
})

const setWaveformData = (waveformData: WaveformData): Action => ({
  type: SET_WAVEFORM_DATA,
  payload: waveformData,
})

const setWaveformBusy = (waveformLoading: boolean): Action => ({
  type: SET_WAVEFORM_BUSY,
  payload: waveformLoading,
})

const thunkGetChannelData = (): ThunkAction<void, IState, null, Action> => async dispatch => {
  dispatch(setWaveformBusy(true))
  dispatch(setChannelData(await getChannelData()))
  dispatch(setWaveformBusy(false))
}

// ================================================================================
// Reducer
// ================================================================================
const initialState: IState = {
  channelData: { leftChannelData: new Float32Array(), rightChannelData: new Float32Array() }, // TODO: Move to audio module
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

    case SET_WAVEFORM_DATA:
      return { ...state, waveformData: payload }

    case SET_WAVEFORM_BUSY:
      return { ...state, waveformLoading: payload }

    default:
      return state
  }
}

export {
  setChannelData,
  setWaveformData,
  setWaveformBusy,
  thunkGetChannelData,

  initialState,

  reducer,
}
