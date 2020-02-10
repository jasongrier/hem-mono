import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShadeOption, setStep } from '../index'
import { RootState } from '../../../index'

declare var skinToneOptions: any[]

function Step3(): ReactElement {
  const { skinToneOption } = useSelector((state: RootState) => ({
    skinToneOption: state.app.skinToneOption,
  }))

  const dispatch = useDispatch()

  function renderShadeOptions() {
    const shadeOptionsUi = []
    // @ts-ignore
    const shadeOptions = skinToneOptions[skinToneOption]

    for (const optionNumber in shadeOptions) {
      if (shadeOptions.hasOwnProperty(optionNumber)) {
        shadeOptionsUi.push(
          <div
            className="shade-option"
            style={{
              backgroundImage: `url(${shadeOptions[optionNumber]})`,
            }}
            onClick={() => {
              dispatch(setShadeOption(optionNumber))
              dispatch(setStep(4))
            }}
          >
            <h3 key={optionNumber}>T{ parseInt(optionNumber, 10) + 1 }</h3>
          </div>
        )
      }
    }

    return shadeOptionsUi
  }

  return (
    <div className="step-content step-3">
      <h1>Which skin shade best matches yours?</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
      <div className="shade-options">
        {renderShadeOptions()}
      </div>
    </div>
  )
}

export default Step3
