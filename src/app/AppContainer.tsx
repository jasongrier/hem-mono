import { debounce } from 'lodash'
import React, { createContext, useReducer, useEffect } from 'react'
import drawWaveform from '../audio/draw-waveform'
import AppView from './AppView'

type mainModes = 'project' | 'editor' | 'arranger'

interface IState {
  channelData: { leftChannelData: number[], rightChannelData: number[] }
  mainMode: mainModes
  sidebarOpen: boolean
  waveformData: number[],
  waveformLoading: boolean
}

interface IContextVal {
  app: IState
  dispatchApp: any
}

const initialState: IState = {
  channelData: { leftChannelData: [], rightChannelData: [] },
  mainMode: 'project',
  sidebarOpen: false,
  waveformData: [],
  waveformLoading: false,
}

const AppContext = createContext({ app: initialState, dispatchApp: undefined } as IContextVal)

const appReducer = (state: IState, {type, payload}: { type: string, payload: any }) => {
  switch (type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'SET_MAIN_MODE':
      return { ...state, mainMode: payload }
    case 'SET_CHANNEL_DATA':
      return { ...state, channelData: payload }
    case 'SET_WAVEFORM_DATA':
      return { ...state, waveformData: payload }
    case 'SET_WAVEFORM_LOADING':
      return { ...state, waveformLoading: payload }
    default:
      throw new Error()
  }
}

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
