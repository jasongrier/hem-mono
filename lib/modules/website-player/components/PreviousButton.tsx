import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PreviousButton as BasePreviousButton } from '../../../packages/hem-buttons'
import { previousTrack } from '../index'

interface IProps {
  className?: string
}

function PreviousButton({ className }: IProps): ReactElement {
  const dispatch = useDispatch()

  const previousButtonOnClick = useCallback(
    function previousButtonOnClickFn() {
      dispatch(previousTrack())
    }, [],
  )

  return (
    <div className="hem-player-next-button">
      <BasePreviousButton
        className={className}
        onClick={previousButtonOnClick}
      />
    </div>
  )
}

export default PreviousButton
