import { debounce } from 'lodash'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getChannelData from '../audio/get-channel-data'
import { RootState } from '../store'
import {
  setChannelData,
  setWaveformData,
  setWaveformLoading,
} from './app.redux'
import AppView from './app-view'

const { remote } = window.require('electron')
console.log(remote.Menu)

const { readFileSync } = window.require('fs')
console.log(readFileSync)

function AppContainer(): React.ReactElement {
  const { channelData, sidebarOpen, waveformData } = useSelector((state: RootState) => ({
    channelData: state.app.channelData,
    sidebarOpen: state.app.sidebarOpen,
    waveformData: state.app.waveformData,
  }))

  const dispatch = useDispatch()

  window.addEventListener('resize', debounce(redrawWaveform, 100))

  useEffect(() => { requestChannelData() }, [])

  useEffect(() => { redrawWaveform() }, [channelData, sidebarOpen])

  function updateWaveformStatus({ msg }: { msg: string }) {
    if (msg === 'loading') {
      dispatch(setWaveformLoading(true))
    }

    else if (msg === 'loaded') {
      dispatch(setWaveformLoading(false))
    }
  }

  function redrawWaveform() {
    const { leftChannelData, rightChannelData } = channelData
    const width = document.body.getBoundingClientRect().width - (sidebarOpen ? 400 : 0)
    const numBars = Math.round(width / 4)
    const stepSize = leftChannelData.length / numBars
    let waveformData: number[] = []

    for (let i = 0; i < leftChannelData.length; i += stepSize) {
      const index = Math.round(i)
      waveformData.push(
        (leftChannelData[index] + rightChannelData[index]) / 2
      )
    }

    dispatch(setWaveformData(waveformData))
  }

  async function requestChannelData() {
    dispatch(setChannelData(await getChannelData(updateWaveformStatus)))
  }

  return (
    <AppView
      sidebarOpen={sidebarOpen}
      waveformData={waveformData}
    />
  )
}

export default AppContainer
