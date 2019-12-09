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
    <div className="hem-application">
      <div className="zak-mock-header" />
      <div className="zak-mock-main">
        <div className="zak-widget zw-clearfix">
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
      <div className="zak-mock-bottom" />
    </div>
  )
}

export default App
