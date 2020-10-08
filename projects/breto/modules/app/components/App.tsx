import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { ProjectScreen, ProjectSplashScreen } from '../../project'
import { RootState } from '../../../index'

function App(): ReactElement {
  const { currentProjectId } = useSelector((state: RootState) => ({
    currentProjectId: state.project.currentProjectId,
  }))

  return (
    <div className="hem-application breto">
      <header>
        <h1>Breto</h1>
      </header>
      <main>
        { currentProjectId && (
          <ProjectScreen />
        )}
        { !currentProjectId && (
          <ProjectSplashScreen />
        )}
      </main>
    </div>
  )
}

export default App
