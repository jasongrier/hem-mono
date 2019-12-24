import React, { ReactElement } from 'react'
import { createPortal } from 'react-dom'
import MidstWidget from './MidstWidget'

declare const MIDST_WIDGET_FILES: string[]

function App(): ReactElement {
  function createPoemPortal(fileName: string) {
    const portalRoot = document.getElementById(fileName)

    if (!portalRoot) {
      throw new Error(`Could not find a <div> with id="${fileName}"!`)
    }

    return createPortal(
      <MidstWidget fileName={fileName} />,
      portalRoot,
    )
  }

  return (
    <div className="hem-application">
      { MIDST_WIDGET_FILES.map(createPoemPortal) }
    </div>
  )
}

export default App
