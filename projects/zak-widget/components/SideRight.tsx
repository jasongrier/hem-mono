import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import OptionRow from './OptionRow'
import SwatchPicker from './SwatchPicker'

function toggleHighIndexAddOn() {}

function tempSwatch(value: string, imageUrl: string) {
  return { imageUrl, value }
}

function tempSelectOption(value: string) {
  return { text: value, value }
}

// TODO: Move these to config or ENV
const lensOptions: any[] = []
const lensPickerOptions: any[] = [
  tempSwatch('one', 'lens-gray.png'),
  tempSwatch('two', 'lens-green.png'),
  tempSwatch('three', 'lens-brown.png'),
]

const prescriptionOptions: any[] = [
  tempSelectOption('one'),
  tempSelectOption('two'),
  tempSelectOption('three'),
  tempSelectOption('four'),
  tempSelectOption('five'),
  tempSelectOption('six'),
]

const swatchPickerOptions: any[] = [
  tempSwatch('one', 'eyeglass-black.png'),
  tempSwatch('two', 'eyeglass-tortoise.png'),
  tempSwatch('three', 'eyeglass-clear.png'),
  tempSwatch('four', 'sunglass-black.png'),
  tempSwatch('five', 'sunglass-tortoise.png'),
  tempSwatch('six', 'sunglass-clear.png'),
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

  console.log(swatchPickerOptions)

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
          select={{ onChange: () => {}, options: lensOptions, title: 'Lens Option', value: 'bar' }}
        />
        <OptionRow
          className="zw-last-option-row"
          action={{ onClick: () => {}, text: 'Customize it!' }}
          select={{ onChange: () => {}, options: tintOptions, title: 'Tint', value: 'bar' }}
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
