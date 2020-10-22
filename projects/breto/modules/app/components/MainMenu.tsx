import React, { ReactElement, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../index'

function MainMenu(): ReactElement {
  const { currentProjectId } = useSelector((state: RootState) => ({
    currentProjectId: state.project.currentProjectId,
  }))

  const loadOnClick = useCallback(
    function loadOnClickFn(evt: any) {

    }, []
  )

  const saveOnClick = useCallback(
    function saveOnClickFn(evt: any) {

    }, []
  )

  return (
    <div className="main-menu">
      <button onClick={loadOnClick}>Load</button>
      <button onClick={saveOnClick}>Save</button>
    </div>
  )
}

export default MainMenu
