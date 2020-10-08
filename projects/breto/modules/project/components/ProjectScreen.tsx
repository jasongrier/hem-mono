import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FileList } from '../../files'
import { RootState } from '../../../index'

function ProjectScreen(): ReactElement {
  const { currentProjectTitle } = useSelector((state: RootState) => ({
    currentProjectTitle: state.project.currentProjectTitle,
  }))

  const dispatch = useDispatch()

  return (
    <div className="project-screen">
      <header>
        <h1>{ currentProjectTitle }</h1>
      </header>
      <main>
        <aside>
          <FileList />
        </aside>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default ProjectScreen
