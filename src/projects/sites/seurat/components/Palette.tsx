import React, { ReactElement } from 'react'

import PerformanceController from './PerformanceController'

function Palette(): ReactElement {
  return (
    <div className="palette">
      <PerformanceController cursorGroup="white" />
      <PerformanceController cursorGroup="yellow" />
      <PerformanceController cursorGroup="blue" />
      <PerformanceController cursorGroup="red" />
    </div>
  )
}

export default Palette
