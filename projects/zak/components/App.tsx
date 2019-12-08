import React, { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadProduct } from '../store/actions'
import ZwLeft from './ZwLeft'
import ZwRight from './ZwRight'

declare const PDP_ENV: any

function App(): ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProduct(PDP_ENV.productId))
  }, [])

  return (
    <div className="hem-application">
      <div className="zak-mock-header">
        <img src="../static/assets/images/saul-bass-casino-title-sequence-05.jpg" />
      </div>
      <div className="zak-widget">
        <div className="zw-layout">
          <div className="zw-left-container">
            <ZwLeft />
          </div>
          <div className="zw-right-container">
            <ZwRight />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
