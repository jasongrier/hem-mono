import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useWindowSize from '@rehooks/window-size'
import { RootState } from '../store'
import View from './view'

function SidebarContainer(): ReactElement {
  const { filteredTags, filteredFiles } = useSelector((state: RootState) => ({
    filteredTags: state.sidebar.filteredTags,
    filteredFiles: state.sidebar.filteredFiles,
  }))

  return (
    <View
      filteredTags={filteredTags}
      filteredFiles={filteredFiles}
    />
  )
}

export default SidebarContainer
