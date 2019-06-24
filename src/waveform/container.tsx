import { debounce } from 'lodash'
import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from '../spinner'
import { RootState } from '../store'
import getChannelData from '../audio/get-channel-data'
import { redrawWaveform, updateLoading } from './utils'
import { setChannelData } from './redux'
import WaveformView from './view'

function WaveformContainer(): ReactElement {
  const { channelData, sidebarOpen, waveformData, waveformLoading } = useSelector((state: RootState) => ({
    channelData: state.waveform.channelData,
    sidebarOpen: state.app.sidebarOpen,
    waveformData: state.waveform.waveformData,
    waveformLoading: state.waveform.waveformLoading,
  }))

  const dispatch = useDispatch()

  const drawHelper = debounce(() => redrawWaveform(channelData, sidebarOpen, waveformLoading), 100)

  useEffect(() => {
    (async () => { // TODO: Should be a thunk action
      dispatch(setChannelData(await getChannelData(updateLoading)))
    })()
  }, [])

  useEffect(drawHelper, [channelData, sidebarOpen])

  window.addEventListener('resize', drawHelper)

  return (
    <Spinner ready={!waveformLoading}>
      <WaveformView waveformData={waveformData} />
    </Spinner>
  )
}

export default WaveformContainer
