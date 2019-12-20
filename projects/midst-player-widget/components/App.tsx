import React, { ReactElement } from 'react'
import { createPortal } from 'react-dom'
import MidstPlayerStandalone from './MidstPlayerStandalone'

const poems = [
  'id-rather-go-blind',
  'pool',
  'the-climate',
  'the-story',
]

function App(): ReactElement {
  function createPoemPortal(poemId: string) {
    return createPortal(
      <MidstPlayerStandalone poemId={poemId} />,
      document.getElementById(poemId),
    )
  }

  return (
    <div className="hem-application">
      { poems.map(createPoemPortal) }
    </div>
  )
}

export default App
