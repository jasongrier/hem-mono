import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { updateContent } from './redux'
import View from './view'

function SidebarContainer(): ReactElement {
  const { filteredTags, filteredFiles } = useSelector((state: RootState) => ({
    allFiles: state.project.files,
    allTags: state.project.tags,
    filteredFiles: state.sidebar.filteredFiles,
    filteredTags: state.sidebar.filteredTags,
  }))

  const dispatch = useDispatch()

  useEffect(() => { dispatch(updateContent(allFiles, allTags)) }, [allFiles, allTags])

  return (
    <View
      filteredTags={filteredTags}
      filteredFiles={filteredFiles}
    />
  )
}

export default SidebarContainer
