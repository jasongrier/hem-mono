import React, { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requestProduct } from '../store/actions'
import SideLeft from './SideLeft'
import SideRight from './SideRight'

declare const PDP_WIDGET_PRODUCT_ID: any

function App(): ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestProduct(PDP_WIDGET_PRODUCT_ID))
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
