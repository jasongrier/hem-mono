import React, { ReactElement } from 'react'
import { ProjectSplashScreen } from '../../project'

function App(): ReactElement {
  return (
    <div className="hem-application breto">
      <header>
        <h1>Breto</h1>
      </header>
      <main>
        <ProjectSplashScreen />
      </main>
    </div>
  )
}

export default App
