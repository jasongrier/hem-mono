import React, { ReactElement } from 'react'

import PerformanceControls from './PerformanceControls'
import MasterControls from './MasterControls'

function Palette(): ReactElement {
  return (
    <div className="palette">
      <PerformanceControls cursorGroup="red" />
      <PerformanceControls cursorGroup="yellow" />
      <PerformanceControls cursorGroup="blue" />
      <MasterControls />
    </div>
  )
}

export default Palette
