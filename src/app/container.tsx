import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import View from './view'

const AppContainer = (): ReactElement => {
  const { sidebarOpen } = useSelector((state: RootState) => ({
    sidebarOpen: state.app.sidebarOpen,
  }))

  return (
    <View sidebarOpen={sidebarOpen} />
  )
}

export default AppContainer
