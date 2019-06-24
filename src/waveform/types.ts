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
