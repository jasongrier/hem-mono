import React, { ReactElement } from 'react'

import PerformanceControls from './PerformanceControls'
import MainControls from './MainControls'

function Palette(): ReactElement {
  return (
    <div className="palette">
      <PerformanceControls cursorGroup="a" />
      <PerformanceControls cursorGroup="b" />
      <PerformanceControls cursorGroup="c" />
      <MainControls />
    </div>
  )
}

export default Palette
