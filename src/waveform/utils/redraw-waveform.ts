import { store } from '../../store'
import { IChannelData } from '../types'
import { setWaveformData } from '../redux'

function redrawWaveform(
  channelData: IChannelData,
  sidebarOpen: boolean,
  waveformBusy: boolean,
) { // TODO: Tight coupling to sidebar and window

  if (waveformBusy) return

  const { leftChannelData, rightChannelData } = channelData
  const width = document.body.getBoundingClientRect().width - (sidebarOpen ? 400 : 0)
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

export default redrawWaveform
