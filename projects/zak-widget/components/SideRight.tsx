import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import OptionRow from './OptionRow'
import SwatchPicker from './SwatchPicker'
import { getProductTotalPrice } from '../functions'

import {
  LENS_OPTIONS,
  LENS_TREATMENT_OPTIONS,
  PRESCRIPTION_OPTIONS,
  SWATCH_TYPES,
  TINT_OPTIONS
} from '../config'

import {
  setLensColor,
  setLensTreatmentType,
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

function SideRight(): ReactElement {
  const product = useSelector((state: RootState) => state.app.product)
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

  const dispatch = useDispatch()

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
            options={SWATCH_TYPES.map(type => type.id)}
            title="Frame color:"
            value={ swatchType }
          />
        </div>
        <div className="zw-lens-picker">
          <SwatchPicker
            onChange={(value: LensColor) => dispatch(setLensColor(value))}
            options={LENS_OPTIONS}
            title="Lens color:"
            value={ lensColor }
          />
        </div>
        <OptionRow
          label="Prescription"
          action={{
            onClick: () => {},
            text: 'Do you have questions?',
          }}
          select={{
            onChange: (value: PrescriptionType) => dispatch(setPrescriptionType(value)),
            options: PRESCRIPTION_OPTIONS,
            value: prescriptionType,
          }}
        />
        <OptionRow
          label="Lens Treatment"
          action={{
            onClick: () => {},
            text: 'What’s right for me?',
          }}
          select={{
            onChange: (value: LensTreatmentType) => dispatch(setLensTreatmentType(value)),
            options: LENS_TREATMENT_OPTIONS,
            value: lensTreatmentType,
          }}
        />
        <OptionRow
          label="Tints"
          className="zw-last-option-row"
          action={{
            onClick: () => {},
            text: 'Customize it!',
          }}
          select={{
            onChange: (value: TintType) => dispatch(setTintType(value)),
            options: TINT_OPTIONS,
            value: tintType,
          }}
        />
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
              High-index 1.67 lens (+ $75)
            </span>
          </div>
        </div>
        <div className="zw-submit-row">
          <button onClick={() => {}}>
            Add to Cart
          </button>
          <a
            className="zw-fit-guide-link zw-plus-left"
            onClick={() => {}}
          >
            Fit Guide
          </a>
          <a
            className="zw-custom-link zw-arrow-right"
            onClick={() => {}}
          >
            Custom Options
          </a>
        </div>
      </div>
    </div>
  )
}

export default SideRight
