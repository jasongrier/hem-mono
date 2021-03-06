import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { NextButton as BaseNextButton } from '../../../packages/hem-buttons'
import { nextTrack } from '../index'

interface IProps {
  className?: string
}

function NextButton({ className }: IProps): ReactElement {
  const dispatch = useDispatch()

  const nextButtonOnClick = useCallback(
    function nextButtonOnClickFn() {
      dispatch(nextTrack())
    }, [],
  )

  return (
    <div className="hem-player-next-button">
      <BaseNextButton
        className={className}
        onClick={nextButtonOnClick}
      />
    </div>
  )
}

export default NextButton
