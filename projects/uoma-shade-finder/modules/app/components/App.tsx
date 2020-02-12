import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../index'
import { setStep } from '../index'
import { ChevronButton } from '../../../../../lib/components/buttons'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Subquiz from './Subquiz'
import StepsProgress from './StepsProgress'

function App(): ReactElement {
  const { completedSteps, currentStep, isPopup } = useSelector((state: RootState) => ({
    completedSteps: state.app.completedSteps,
    currentStep: state.app.currentStep,
    isPopup: state.app.isPopup,
  }))

  const dispatch = useDispatch()

  const onLeftButtonClicked = useCallback(
    function onLeftButtonClicked() {
      if (currentStep < 1) return
      dispatch(setStep(currentStep - 1))
    }, [currentStep],
  )

  const onRightButtonClicked = useCallback(
    function onRightButtonClicked() {
      if (currentStep > 3) return
      dispatch(setStep(currentStep + 1))
    }, [currentStep],
  )

  return (
    <div className="hem-application">
      <div className={`
        step-container
        step-container-${isPopup ? 'popup' : 'page'}
        step-container-on-${currentStep}
      `}>
        <div className="step-slider-container">
          <Step1 />
          <Step2 />
          <Step3 />
          <Step4 />
          <Step5 />
        </div>

        { currentStep > 1 && currentStep < 5 &&
          <div className="step-chevron-button step-chevron-button-left">
            <ChevronButton onClick={onLeftButtonClicked} />
          </div>
        }

        { currentStep < 4 && completedSteps > currentStep &&
          <div className="step-chevron-button step-chevron-button-right">
            <ChevronButton onClick={onRightButtonClicked} />
          </div>
        }

        <StepsProgress />
        <div className="step-color-strip"></div>
      </div>

      {isPopup &&  (
        <div className="step-popup-overlay" />
      )}
    </div>
  )
}

export default App
