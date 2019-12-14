import React, { ReactElement, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import OptionRow from './OptionRow'
import SwatchPicker from './SwatchPicker'

import {
  getHighIndexOption,
  getLensColorOptions,
  getLensTreatmentOptions,
  getPrescriptionOptions,
  getProductTotalPrice,
  getSwatchOptions,
  getTintOptions,
} from '../functions'

import {
  setLensColor,
  setLensTreatmentType,
  setPrescriptionFile,
  setPrescriptionType,
  setSwatchType,
  setTintType,
  toggleHighIndexAddOn,
} from '../store/actions'

import {
  LensColor,
  LensTreatmentType,
  PrescriptionType,
  SwatchType,
  TintType,
} from '../store/types'

const highIndexOption = getHighIndexOption()
const lensColorOptions = getLensColorOptions()
const lensTreatmentOptions = getLensTreatmentOptions()
const prescriptionOptions = getPrescriptionOptions()
const swatchOptions = getSwatchOptions()
const tintOptions = getTintOptions()

function SideRight(): ReactElement {
  const product = useSelector((state: RootState) => state.app.product)

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
    lensTreatmentType,
    prescriptionType,
    secondaryTitle,
    swatchType,
    swatchTypeText,
    tintType,
    title,
  } = product

  const total = getProductTotalPrice(product)

  return (
    <div className="zw-right">
      <div className="zw-product-options">
        <h2>{ title }</h2>
        <h3>{ secondaryTitle }</h3>
        <h4>{ swatchTypeText }</h4>
        <div className="zw-primary-picker">
          <SwatchPicker
            onChange={(value: SwatchType) => dispatch(setSwatchType(value))}
            options={swatchOptions}
            title="Frame color:"
            value={ swatchType }
          />
        </div>
        <div className="zw-lens-picker">
          <SwatchPicker
            onChange={(value: LensColor) => dispatch(setLensColor(value))}
            options={lensColorOptions}
            title="Lens color:"
            value={ lensColor }
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
              onChange: (value: PrescriptionType) => dispatch(setPrescriptionType(value)),
              options: prescriptionOptions,
              value: prescriptionType,
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
              onChange: (value: LensTreatmentType) => dispatch(setLensTreatmentType(value)),
              options: lensTreatmentOptions,
              value: lensTreatmentType,
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
              onChange: (value: TintType) => dispatch(setTintType(value)),
              options: tintOptions,
              value: tintType,
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
