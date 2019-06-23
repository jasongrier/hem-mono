import { fill } from 'lodash'
import React, { createContext, useReducer, useEffect } from 'react'
import drawWaveform from '../audio/draw-waveform'
import AppView from './AppView'

type mainModes = 'project' | 'editor' | 'arranger'

interface IState {
  sidebarOpen: boolean
  mainMode: mainModes
  bars: number[]
}

interface IContextVal {
  app: IState
  dispatchApp: any
}

const initialState: IState = {
  sidebarOpen: false,
  mainMode: 'project',
  bars: [],
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
    default:
      throw new Error()
  }
}

function AppContainer(): React.ReactElement {
  const [app, dispatchApp] = useReducer(appReducer, initialState)

  useEffect(() => { getBars() }, [])

  async function getBars() {
    const width = document.body.getBoundingClientRect().width
    const numBars = Math.round(width / 4)
    const bars = await drawWaveform(numBars, console.log)
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
