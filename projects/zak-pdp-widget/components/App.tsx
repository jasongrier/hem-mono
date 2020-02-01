import React, { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initProduct } from '../store/actions'
import SideLeft from './SideLeft'
import SideRight from './SideRight'

function App(): ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initProduct())
  }, [])

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
