import React, { ReactElement } from 'react'
import SideLeft from './SideLeft'
import SideRight from './SideRight'

function App(): ReactElement {
  return (
    <div className="hem-application page__content-wrapper--force-background">
      <div className="zw-layout-container">
        <div className="zw-widget zw-clearfix">
          <div className="zw-layout">
            <div className="zw-section zw-section-left">
              <SideLeft />
            </div>
            <div className="zw-section zw-section-right">
              <SideRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
