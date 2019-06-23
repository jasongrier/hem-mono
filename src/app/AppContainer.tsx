import React, { createContext, useReducer } from 'react'
import AppView from './AppView'

type mainModes = 'project' | 'editor' | 'arranger'

interface IState {
  sidebarOpen: boolean
  mainMode: mainModes
}

interface IContextVal {
  app: IState
  dispatchApp: any
}

const initialState: IState = {
  sidebarOpen: false,
  mainMode: 'project',
}

const AppContext = createContext({ app: initialState, dispatchApp: undefined } as IContextVal)

const appReducer = (state: IState, action: { type: string, payload: mainModes }) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'SET_MAIN_MODE':
      return { ...state, mainMode: action.payload }
    default:
      throw new Error()
  }
}

function AppContainer(): React.ReactElement {
  const [app, dispatchApp] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ app, dispatchApp }}>
      <AppView />
    </AppContext.Provider>
  )
}

export { AppContext }
export default AppContainer
