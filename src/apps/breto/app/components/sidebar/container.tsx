import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
// import { updateContent } from './redux'
import View from './view'

function SidebarContainer(): ReactElement {
  const { filteredTags, filteredFiles, filterText } = useSelector((state: RootState) => ({
    filteredFiles: state.project.filteredFiles,
    filteredTags: state.project.filteredTags,
    filterText: state.project.filterText,
  }))

  const dispatch = useDispatch()

  return (
    <View
      filteredTags={filteredTags}
      filteredFiles={filteredFiles}
      filterText={filterText}
    />
  )
}

export default SidebarContainer
