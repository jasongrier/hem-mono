import React, { ReactElement } from 'react'

import PerformanceControls from './PerformanceControls'

function Palette(): ReactElement {
  return (
    <div className="palette">
      {/* <PerformanceControls cursorGroup="white" /> */}
      <PerformanceControls cursorGroup="red" />
      <PerformanceControls cursorGroup="yellow" />
      <PerformanceControls cursorGroup="blue" />
    </div>
  )
}

export default Palette
