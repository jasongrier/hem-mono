import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import OptionRow from './OptionRow'
import SwatchPicker from './SwatchPicker'

// TODO: Move these to config or ENV
const lensOptions: any[] = []
const lensPickerOptions: any[] = []
const prescriptionOptions: any[] = []
const swatchPickerOptions: any[] = []
const tintOptions: any[] = []

function SideRight(): ReactElement {
  const { productTitle } = useSelector((state: RootState) => {
    const product = state.app.product
    return {
      productTitle: product && product.title,
    }
  })

  const total = 395

  return (
    <div className="zw-right">
      <div className="zw-product-options">
        <h2>{ productTitle }</h2>
        <div className="zw-primary-picker">
          <SwatchPicker
            onChange={() => {}}
            options={swatchPickerOptions}
            title="Frame color:"
            value={'foo'}
          />
        </div>
        <div className="zw-lens-picker">
          <SwatchPicker
            onChange={() => {}}
            options={lensPickerOptions}
            title="Lens color:"
            value={'foo'}
          />
        </div>
        <OptionRow
          action={{ onClick: () => {}, text: 'Do you have questions?' }}
          select={{ onChange: () => {}, options: prescriptionOptions, title: 'Prescription', value: 'foo' }}
        />
        <OptionRow
          action={{ onClick: () => {}, text: 'What’s right for me?' }}
          select={{ onChange: () => {}, options: lensOptions, title: 'Lens Option', value: 'foo' }}
        />
        <OptionRow
          action={{ onClick: () => {}, text: 'Customize it!' }}
          select={{ onChange: () => {}, options: tintOptions, title: 'Tint', value: 'foo' }}
        />
        <div className="zw-total-row">
          <span className="zw-total">
            ${ total }
          </span>
          <div className="zw-add-on">
            <button className="zw-add-on-button" />
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
