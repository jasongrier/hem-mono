export type WaveformData = number[]

export interface IChannelData {
  leftChannelData: Float32Array
  rightChannelData: Float32Array
}

export interface IState {
  channelData: IChannelData // TODO: Move to audio module
  waveformData: WaveformData
  waveformLoading: boolean
}

export const SET_CHANNEL_DATA = 'SET_CHANNEL_DATA' // TODO: Move all types to ./types.ts
export const SET_WAVEFORM_DATA = 'SET_WAVEFORM_DATA'
export const SET_WAVEFORM_BUSY = 'SET_WAVEFORM_BUSY'

export interface ISetChannelData extends IAction {
  type: typeof SET_CHANNEL_DATA
  payload: IChannelData
}

export interface ISetWaveformData extends IAction {
  type: typeof SET_WAVEFORM_DATA
  payload: WaveformData
}

export interface ISetWaveformBusy extends IAction {
  type: typeof SET_WAVEFORM_BUSY
  payload: boolean
}

export type Action =
    ISetChannelData
  | ISetWaveformData
  | ISetWaveformBusy