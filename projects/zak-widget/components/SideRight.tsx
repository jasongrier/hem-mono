import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import OptionRow from './OptionRow'
import SwatchPicker from './SwatchPicker'

function toggleHighIndexAddOn() {}

function tempSwatch(value: string) {
  return { imageUrl: 'foo', value }
}

// TODO: Move these to config or ENV
const lensOptions: any[] = []
const lensPickerOptions: any[] = [
  tempSwatch('one'),
  tempSwatch('two'),
  tempSwatch('three'),
]

const prescriptionOptions: any[] = []

const swatchPickerOptions: any[] = [
  tempSwatch('one'),
  tempSwatch('two'),
  tempSwatch('three'),
  tempSwatch('four'),
  tempSwatch('five'),
  tempSwatch('six'),
]

const tintOptions: any[

] = []

function SideRight(): ReactElement {
  const { productHasHighIndexAddOn, productSecondaryTitle, productTitle } = useSelector((state: RootState) => {
    const product = state.app.product
    return {
      productHasHighIndexAddOn: product && product.hasHighIndexAddOn,
      productSecondaryTitle: product && product.secondaryTitle,
      productTitle: product && product.title,
    }
  })

  const dispatch = useDispatch()

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
            value={'one'}
          />
        </div>
        <div className="zw-lens-picker">
          <SwatchPicker
            onChange={() => {}}
            options={lensPickerOptions}
            title="Lens color:"
            value={'one'}
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
          <div className="zw-total">
            ${ total }
          </div>
          <div
            className="zw-add-on"
            onClick={() => dispatch(toggleHighIndexAddOn())}
          >
            <button className={`zw-add-on-button ${productHasHighIndexAddOn ? 'zw-add-on-button-active' : ''}`} />
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
