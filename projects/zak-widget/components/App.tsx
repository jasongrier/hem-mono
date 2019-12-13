import React, { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadProduct } from '../store/actions'
import SideLeft from './SideLeft'
import SideRight from './SideRight'

declare const PDP_ENV: any

function App(): ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(loadProduct(PDP_ENV.productId))
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
