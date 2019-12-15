import React, { ReactElement, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import {
  getHighIndexOption,
  getProductOptions,
  getProductTotalPrice,
  getThemeTitle,
  getTintOptions,
  productOptionsToSelectOptions,
} from '../functions'

import {
  setLensColor,
  setLensTreatment,
  setPrescription,
  setPrescriptionFile,
  setTheme,
  setTint,
  toggleHighIndexAddOn,
} from '../store/actions'

import {
  LensColor,
  Theme,
} from '../store/types'

import OptionRow from './OptionRow'
import SwatchPicker from './SwatchPicker'

const themeOptions: Theme[] = [
  'eyeglass-black',
  'eyeglass-tortoise',
  'eyeglass-clear',
  'sunglass-black',
  'sunglass-tortoise',
  'sunglass-clear',
]

const lensColorOptions: LensColor[] = [
  'lens-gray',
  'lens-green',
  'lens-brown',
]

function SideRight(): ReactElement {
  const { product, theme } = useSelector((state: RootState) => ({
    product: state.app.product,
    theme: state.app.theme,
  }))

  const dispatch = useDispatch()

  const onFileInputChanged = useCallback(
    (evt: any) => {
      dispatch(setPrescriptionFile(evt.target.files[0]))
    }, [],
  )

  if (!product) return <div />

  const {
    hasHighIndexAddOn,
    lensColor,
    lensTreatment,
    prescription,
    secondaryTitle,
    tint,
    title,
  } = product

  const highIndexOption = getHighIndexOption()
  const lensTreatmentOptions = getProductOptions('Lens Treatment')
  const prescriptionOptions = getProductOptions('Prescription')
  const tintOptions = getTintOptions()

  const themeTitle = getThemeTitle(theme)
  const total = getProductTotalPrice(product)

  return (
    <div className="zw-right">
      <div className="zw-product-options">
        <h2>{ title }</h2>
        <h3>{ secondaryTitle }</h3>
        <h4>{ themeTitle }</h4>
        <div className="zw-primary-picker">
          <SwatchPicker
            onChange={(theme: Theme) => dispatch(setTheme(theme))}
            options={themeOptions}
            title="Frame color:"
            value={theme}
          />
        </div>
        <div className="zw-lens-picker">
          <SwatchPicker
            onChange={(value: LensColor) => dispatch(setLensColor(value))}
            options={lensColorOptions}
            title="Lens color:"
            value={lensColor}
          />
        </div>
        <a
          className="zw-fit-guide-link zw-plus-left"
          data-remodal-target="fit-guide-view"
          onClick={() => {}}
        >
          Fit Guide
        </a>
        { prescriptionOptions && (
          <OptionRow
            label="Prescription"
            action={{
              remodalTarget: 'prescription-options-view',
              text: 'Do you have questions?',
            }}
            select={{
              onChange: (name: string) => dispatch(setPrescription(name)),
              options: productOptionsToSelectOptions(prescriptionOptions),
              value: prescription.name,
            }}
          />
        )}
        { lensTreatmentOptions && (
          <OptionRow
            label="Lens Treatment"
            action={{
              remodalTarget: 'lens-treatment-options-view',
              text: 'What’s right for me?',
            }}
            select={{
              onChange: (name: string) => dispatch(setLensTreatment(name)),
              options: productOptionsToSelectOptions(lensTreatmentOptions),
              value: lensTreatment.name,
            }}
          />
        )}
        { tintOptions && (
          <OptionRow
            label="Tints"
            className="zw-last-option-row"
            action={{
              remodalTarget: 'tint-options-view',
              text: 'Customize it!',
            }}
            select={{
              onChange: (name: string) => dispatch(setTint(name)),
              options:productOptionsToSelectOptions(tintOptions),
              value: tint.name,
            }}
          />
        )}
        <div className="zw-total-row">
          <div className="zw-total">
            ${ total }
          </div>
          <div
            className="zw-add-on"
            onClick={() => dispatch(toggleHighIndexAddOn())}
          >
            <button className={`zw-add-on-button ${hasHighIndexAddOn ? 'zw-add-on-button-active' : ''}`} />
            <span className="zw-add-on-label">
              { highIndexOption.title } (+ ${ highIndexOption.price })
            </span>
          </div>
        </div>
        <div className="zw-submit-row">
          <button
            className="zw-submit-button"
            onClick={() => {}}
          >
            Add to Cart
          </button>
          <button
            className="zw-upload-rx-button"
            onClick={() => {}}
          >
            <span className="zw-upload-rx-button-text">
              Upload RX
              <span className="ion-ios-arrow-thin-right" />
            </span>
            <input
              multiple={false}
              onChange={onFileInputChanged}
              type="file"
            />
          </button>
          <a
            className="zw-more-info-link zw-plus-left"
            data-remodal-target="upload-options-view"
          >
            More info
          </a>
          <p className="zw-patient-info">
            If you’re a Zak. patient or have ordered with us in the past, we have your prescription on file. You do not need to upload it. Just check out!
          </p>
        </div>
      </div>
    </div>
  )
}

export default SideRight
