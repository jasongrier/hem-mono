import { store } from '../../../store'
import { IChannelData } from './types'
import { setWaveformData } from './redux'

function redrawWaveform(
  channelData: IChannelData,
  width: number,
  waveformBusy: boolean
) {

  if (waveformBusy) return

  const { leftChannelData, rightChannelData } = channelData
  const numBars = Math.round(width / 4)
  const stepSize = leftChannelData.length / numBars
  let newWaveformData: number[] = []

  for (let i = 0; i < leftChannelData.length; i += stepSize) {
    const index = Math.round(i)
    newWaveformData.push(
      (leftChannelData[index] + rightChannelData[index]) / 2
    )
  }

  store.dispatch(setWaveformData(newWaveformData))
}

export { redrawWaveform }
