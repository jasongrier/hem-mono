import { debounce } from 'lodash'
import React, { useReducer, useEffect } from 'react'
import { initialState, appReducer, AppContext } from './app.redux'
import drawWaveform from '../audio/draw-waveform'
import AppView from './app-view'

const { remote } = window.require('electron')
console.log(remote.Menu)

const { readFileSync } = window.require('fs')
console.log(readFileSync)

function AppContainer(): React.ReactElement {
  const [app, dispatchApp] = useReducer(appReducer, initialState)

  window.addEventListener('resize', debounce(redrawWaveform, 100))

  useEffect(() => { getChannelData() }, [])

  useEffect(() => { redrawWaveform() }, [app.channelData, app.sidebarOpen])

  function updateWaveformStatus({ msg }: { msg: string }) {
    if (msg === 'loading') {
      dispatchApp({ type: 'SET_WAVEFORM_LOADING', payload: true })
    }

    else if (msg === 'loaded') {
      dispatchApp({ type: 'SET_WAVEFORM_LOADING', payload: false })
    }
  }

  function redrawWaveform() {
    const { leftChannelData, rightChannelData } = app.channelData
    const width = document.body.getBoundingClientRect().width - (app.sidebarOpen ? 400 : 0)
    const numBars = Math.round(width / 4)
    const stepSize = leftChannelData.length / numBars
    let waveformData: number[] = []

    for (let i = 0; i < leftChannelData.length; i += stepSize) {
      const index = Math.round(i)
      waveformData.push(
        (leftChannelData[index] + rightChannelData[index]) / 2
      )
    }

    dispatchApp({ type: 'SET_WAVEFORM_DATA', payload: waveformData })
  }

  async function getChannelData() {
    dispatchApp({
      type: 'SET_CHANNEL_DATA',
      payload: await drawWaveform(updateWaveformStatus)
    })
  }

  return (
    <AppContext.Provider value={{ app, dispatchApp }}>
      <AppView />
    </AppContext.Provider>
  )
}

export { AppContext }
export default AppContainer
