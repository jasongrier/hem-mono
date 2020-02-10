import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../index'
import { setStep } from '../index'

interface IProps {
  stepNumber: number
}

function StepsProgress({ stepNumber }: IProps): ReactElement {
  const { completedSteps, currentStep } = useSelector((state: RootState) => ({
    completedSteps: state.app.completedSteps,
    currentStep: state.app.currentStep,
  }))

  const dispatch = useDispatch()

  const onClick = useCallback(
    function onClick() {
      if (completedSteps < stepNumber) return
      dispatch(setStep(stepNumber))
    }, [],
  )

  return (
    <div
      className={`
        steps-progress-item
        steps-progress-item-${stepNumber}
        ${ currentStep === stepNumber ? 'steps-progress-item-active' : ''}
        ${ completedSteps >= stepNumber ? 'steps-progress-item-completed' : ''}
      `}
      onClick={onClick}
    >
      Step{stepNumber}
    </div>
  )
}

export default StepsProgress
