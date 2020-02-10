import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../index'
import { setStep, setUndertoneOption } from '../index'
import UndertoneOption from './UndertoneOption'

function Step4(): ReactElement {
  const { undertoneOption } = useSelector((state: RootState) => ({
    undertoneOption: state.app.undertoneOption,
  }))

  const dispatch = useDispatch()

  const setUndertoneOptionAndProgress = useCallback(
    function(undertoneOption: string) {
      if (undertoneOption === 'no-clue') {
        alert('huh!')
        return
      }

      dispatch(setUndertoneOption(undertoneOption))
      dispatch(setStep(5))
    }, [],
  )

  return (
    <div className="step-content step-4">
      <h1>What’s your Undertone?</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
      <div className="undertone-options">
        <UndertoneOption
          onSelect={() => setUndertoneOptionAndProgress('warm')}
          selected={undertoneOption === 'warm'}
          title="Warm"
        />
        <UndertoneOption
          onSelect={() => setUndertoneOptionAndProgress('neutral')}
          selected={undertoneOption === 'neutral'}
          title="Neutral"
        />
        <UndertoneOption
          onSelect={() => setUndertoneOptionAndProgress('cool')}
          selected={undertoneOption === 'cool'}
          title="Cool"
        />
        <UndertoneOption
          onSelect={() => setUndertoneOptionAndProgress('no-clue')}
          selected={undertoneOption === 'no-clue'}
          title="LOL! No clue."
        />
      </div>
    </div>
  )
}

export default Step4
