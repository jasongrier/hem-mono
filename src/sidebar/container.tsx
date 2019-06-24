import React, { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useWindowSize from '@rehooks/window-size'
import { RootState } from '../store'
import View from './view'

function SidebarContainer(): ReactElement {
  const { mainMode, sidebarOpen } = useSelector((state: RootState) => ({
    mainMode: state.app.mainMode,
    sidebarOpen: state.app.sidebarOpen,
  }))

  const windowSize = useWindowSize()

  return (
    <View />
  )
}

export default SidebarContainer
