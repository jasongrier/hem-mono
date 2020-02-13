import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setStep } from '../index'

function Step1(): ReactElement {
  const dispatch = useDispatch()

  const launchBrandMatchPopup = useCallback(
    function launchBrandMatchPopup() {
      alert('launch popup')
    }, [],
  )

  const startQuiz = useCallback(
    function startQuiz() {
      dispatch(setStep(2))
    }, [],
  )

  return (
    <div className="step-content step-1">
      <h1>FIND YOUR SHADE MATCH</h1>
      <p>Take our Shade Finder Quiz to find your perfect match or tell us which brand &amp; shade you’re currently using – assuming its not ashy, lol.</p>

      <button onClick={launchBrandMatchPopup}>Match by brand</button>
      <button onClick={startQuiz}>Shade Finder Quiz</button>
      <img className="bottom-banner" src="https://cdn.shopify.com/s/files/1/0019/8839/5107/files/mobile-banner.jpg?v=1581559531"/>
    </div>
  )
}

export default Step1
