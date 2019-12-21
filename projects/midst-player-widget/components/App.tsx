import React, { ReactElement } from 'react'
import { createPortal } from 'react-dom'
import MidstPlayerStandalone from './MidstPlayerStandalone'

declare const POEMS

function App(): ReactElement {
  function createPoemPortal(poemId: string) {
    return createPortal(
      <MidstPlayerStandalone poemId={poemId} />,
      document.getElementById(poemId),
    )
  }

  return (
    <div className="hem-application">
      { POEMS.map(createPoemPortal) }
    </div>
  )
}

export default App
