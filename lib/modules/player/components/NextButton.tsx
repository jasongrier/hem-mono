import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NextButton as BaseNextButton } from '../../../packages/hem-buttons'
import { nextTrack } from '../index'

function NextButton(): ReactElement {
  const dispatch = useDispatch()

  const nextButtonOnClick = useCallback(
    function nextButtonOnClickFn() {
      dispatch(nextTrack())
    }, [],
  )

  return (
    <div className="hem-player-next-button">
      <BaseNextButton onClick={nextButtonOnClick} />
    </div>
  )
}

export default NextButton
