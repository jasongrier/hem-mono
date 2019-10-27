import React, { ReactElement } from 'react'

import PerformanceControls from './PerformanceControls'
import MasterControls from './MasterControls'

function Palette(): ReactElement {
  return (
    <div className="palette">
      <PerformanceControls cursorGroup="a" />
      <PerformanceControls cursorGroup="b" />
      <PerformanceControls cursorGroup="c" />
      <MasterControls />
    </div>
  )
}

export default Palette
