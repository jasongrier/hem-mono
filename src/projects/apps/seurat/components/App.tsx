import React, { ReactElement } from 'react'
import Board from './Board'
import Palette from './Palette'

function App(): ReactElement {
  return (
    <div className="hem-application">asdfasdfasdf
      <div className="drawer">
        <Palette />
      </div>
      <Board />
    </div>
  )
}

export default App
