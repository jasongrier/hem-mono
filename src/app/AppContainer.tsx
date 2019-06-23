import { fill } from 'lodash'
import React, { createContext, useReducer, useEffect } from 'react'
import drawWaveform from '../audio/draw-waveform'
import AppView from './AppView'

type mainModes = 'project' | 'editor' | 'arranger'

interface IState {
  bars: number[]
  mainMode: mainModes
  sidebarOpen: boolean
  waveformLoading: boolean
}

interface IContextVal {
  app: IState
  dispatchApp: any
}

const initialState: IState = {
  bars: [],
  mainMode: 'project',
  sidebarOpen: false,
  waveformLoading: false,
}

const AppContext = createContext({ app: initialState, dispatchApp: undefined } as IContextVal)

const appReducer = (state: IState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'SET_MAIN_MODE':
      return { ...state, mainMode: action.payload }
    case 'SET_BARS':
      return { ...state, bars: action.payload }
    case 'SET_WAVEFORM_LOADING':
      return { ...state, waveformLoading: action.payload }
    default:
      throw new Error()
  }
}

function AppContainer(): React.ReactElement {
  const [app, dispatchApp] = useReducer(appReducer, initialState)

  useEffect(() => { getBars() }, [])

  function updateWaveformStatus({ msg }: { msg: string }) {
    if (msg === 'loading') {
      dispatchApp({ type: 'SET_WAVEFORM_LOADING', payload: true })
    }

    else if (msg === 'loaded') {
      dispatchApp({ type: 'SET_WAVEFORM_LOADING', payload: false })
    }
  }

  async function getBars() {
    const width = document.body.getBoundingClientRect().width
    const numBars = Math.round(width / 4)
    const bars = await drawWaveform(numBars, updateWaveformStatus)

    dispatchApp({ type: 'SET_BARS', payload: bars })
  }

  return (
    <AppContext.Provider value={{ app, dispatchApp }}>
      <AppView />
    </AppContext.Provider>
  )
}

export { AppContext }
export default AppContainer
