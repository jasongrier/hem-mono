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
          <p></p>
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

          <div className="sub-quiz-cols">
            <div className="sub-quiz-col sub-quiz-left">
              <h3>What tone of jewelry do you look best in?</h3>
              <SubQuizQuestion
                onClick={() => setSubQuizToneCb('a')}
                selected={subQuizTone === 'a'}
                title="Silver/Platinum"
              />
              <SubQuizQuestion
                onClick={() => setSubQuizToneCb('b')}
                selected={subQuizTone === 'b'}
                title="Yellow Gold"
              />
              <SubQuizQuestion
                onClick={() => setSubQuizToneCb('c')}
                selected={subQuizTone === 'c'}
                title="What? Girl, I have no idea"
              />
            </div>
            <div className="sub-quiz-col sub-quiz-right">
              <h3>What color are the veins on your wrist?</h3>
              <SubQuizQuestion
                onClick={() => setSubQuizVeinsCb('a')}
                selected={subQuizVeins === 'a'}
                title="Purple"
              />
              <SubQuizQuestion
                onClick={() => setSubQuizVeinsCb('b')}
                selected={subQuizVeins === 'b'}
                title="Blue/Green"
              />
              <SubQuizQuestion
                onClick={() => setSubQuizVeinsCb('c')}
                selected={subQuizVeins === 'c'}
                title="Green"
              />
              <SubQuizQuestion
                onClick={() => setSubQuizVeinsCb('d')}
                selected={subQuizVeins === 'd'}
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
