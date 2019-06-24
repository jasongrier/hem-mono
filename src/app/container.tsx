import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useWindowSize from '@rehooks/window-size'
import { RootState } from '../store'
import View from './view'

function AppContainer(): ReactElement {
  const { mainMode, sidebarOpen } = useSelector((state: RootState) => ({
    mainMode: state.app.mainMode,
    sidebarOpen: state.app.sidebarOpen,
  }))

  const windowSize = useWindowSize()

  return (
    <View
      mainMode={mainMode}
      sidebarOpen={sidebarOpen}
      mainWidth={windowSize.innerWidth - (sidebarOpen ? 400 : 0)}
    />
  )
}

export default AppContainer
