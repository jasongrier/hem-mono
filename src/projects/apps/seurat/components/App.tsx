import React, { ReactElement, useEffect } from 'react'
import Board from './Board'
import ClockReceiver from './ClockReceiver'
import Palette from './Palette'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <div className="drawer">
        <Palette />
      </div>
      <Board />
      <ClockReceiver />
    </div>
  )
}

export default App
