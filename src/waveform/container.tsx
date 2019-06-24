import { debounce } from 'lodash'
import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from '../spinner'
import { RootState } from '../store'
import { redrawWaveform } from './utils'
import { thunkGetChannelData } from './redux'
import WaveformView from './view'

function WaveformContainer(): ReactElement {
  const { channelData, sidebarOpen, waveformData, waveformLoading } = useSelector((state: RootState) => ({
    channelData: state.waveform.channelData,
    sidebarOpen: state.app.sidebarOpen,
    waveformData: state.waveform.waveformData,
    waveformLoading: state.waveform.waveformLoading,
  }))

  const dispatch = useDispatch()

  const drawHelper = () => redrawWaveform(channelData, sidebarOpen, waveformLoading)

  useEffect(() => { dispatch(thunkGetChannelData()) }, [])

  useEffect(drawHelper, [waveformLoading, sidebarOpen])

  window.addEventListener('resize', debounce(drawHelper, 500))

  return (
    <Spinner ready={!waveformLoading}>
      <WaveformView waveformData={waveformData} />
    </Spinner>
  )
}

export default WaveformContainer
