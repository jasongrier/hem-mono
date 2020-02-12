import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../index'
import { setNeedsSubquiz, setStep, setSubQuizTone, setSubQuizVeins, setUndertoneOption } from '../index'
import UndertoneOption from './UndertoneOption'
import SubQuizQuestion from './SubQuizQuestion'

function Step4(): ReactElement {
  const { needsSubquiz, subQuizTone, subQuizVeins, undertoneOption } = useSelector((state: RootState) => ({
    needsSubquiz: state.app.needsSubquiz,
    subQuizTone: state.app.subQuizTone,
    subQuizVeins: state.app.subQuizVeins,
    undertoneOption: state.app.undertoneOption,
  }))

  const dispatch = useDispatch()

  const setUndertoneOptionAndProgress = useCallback(
    function setUndertoneOptionAndProgress(undertoneOption: string) {
      if (undertoneOption === 'no-clue') {
        dispatch(setNeedsSubquiz(true))
      }

      else {
        dispatch(setUndertoneOption(undertoneOption))
        dispatch(setStep(5))
      }
    }, [],
  )

  const setSubQuizToneCb = useCallback(
    function setSubQuizToneCb(subQuizToneVal: string) {
      dispatch(setSubQuizTone(subQuizToneVal))

      if (subQuizVeins) {
        dispatch(setStep(5))
      }
    }, [subQuizTone, subQuizVeins],
  )

  const setSubQuizVeinsCb = useCallback(
    function setSubQuizVeinsCb(subQuizVeinsVal: string) {
      dispatch(setSubQuizVeins(subQuizVeinsVal))

      if (subQuizTone) {
        dispatch(setStep(5))
      }
    }, [subQuizTone, subQuizVeins],
  )

  return (
    <>
      {!needsSubquiz &&
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
      }
      {needsSubquiz &&
        <div className="step-content step-4 sub-quiz">
          <h1>That’s okay, we’re here to help</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>

          <div className="sub-quiz-cols">
            <div className="sub-quiz-col sub-quiz-left">
              <h3>What tone of jewelry do you look best in?</h3>
              <SubQuizQuestion
                onClick={() => setSubQuizToneCb('silver/platinum')}
                selected={subQuizTone === 'silver/platinum'}
                title="Silver/Platinum"
              />
              <SubQuizQuestion
                onClick={() => setSubQuizToneCb('yellow-gold')}
                selected={subQuizTone === 'yellow-gold'}
                title="Yellow Gold"
              />
              <SubQuizQuestion
                onClick={() => setSubQuizToneCb('no-answer')}
                selected={subQuizTone === 'no-answer'}
                title="What? Girl, I have no idea"
              />
            </div>
            <div className="sub-quiz-col sub-quiz-right">
              <h3>What color are the veins on your wrist?</h3>
              <SubQuizQuestion
                onClick={() => setSubQuizVeinsCb('purple')}
                selected={subQuizVeins === 'purple'}
                title="Purple"
              />
              <SubQuizQuestion
                onClick={() => setSubQuizVeinsCb('blue/green')}
                selected={subQuizVeins === 'blue/green'}
                title="Blue/Green"
              />
              <SubQuizQuestion
                onClick={() => setSubQuizVeinsCb('green')}
                selected={subQuizVeins === 'green'}
                title="Green"
              />
              <SubQuizQuestion
                onClick={() => setSubQuizVeinsCb('no-answer')}
                selected={subQuizVeins === 'no-answer'}
                title="What? Girl, I have no idea"
              />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Step4
