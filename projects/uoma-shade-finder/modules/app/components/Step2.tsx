import React, { ReactElement } from 'react'
import { titleCase } from 'voca'
import { useDispatch } from 'react-redux'
import { setSkinToneOption, setStep } from '../index'

declare var skinToneOptions: any

function Step2(): ReactElement {
  const dispatch = useDispatch()

  function renderSkinToneOptions() {
    const skinToneOptionsUi = [] as any

    for (const optionName in skinToneOptions) {
      if (skinToneOptions.hasOwnProperty(optionName)) {
        skinToneOptionsUi.push(
          <div
            key={optionName}
            className="skin-tone-option"
            style={{
              backgroundImage: `url(${skinToneOptions[optionName][0]})`,
            }}
            onClick={() => {
              dispatch(setSkinToneOption(optionName))
              dispatch(setStep(3))
            }}
          >
            <h3 key={optionName}>{ titleCase(optionName.replace(/-/g, ' ')) }</h3>
          </div>
        )
      }
    }

    return skinToneOptionsUi
  }

  return (
    <div className="step-content step-2">
      <h1>Which skin tone best matches yours?</h1>
      <p></p>
      <div className="skin-tone-options">
        {renderSkinToneOptions()}
      </div>
    </div>
  )
}

export default Step2