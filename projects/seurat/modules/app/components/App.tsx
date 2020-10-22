import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { ProjectScreen, ProjectSplashScreen } from '../../project'
import { RootState } from '../../../index'

function App(): ReactElement {
  const { currentProjectId } = useSelector((state: RootState) => ({
    currentProjectId: state.project.currentProjectId,
  }))

  return (
    <div className="hem-application seurat">
      <header>
        <h1>Seurat</h1>
      </header>
      <main>
        <canvas id="seurat-canvas"></canvas>
      </main>
    </div>
  )
}

export default App
