import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import OptionRow from './OptionRow'
import SwatchPicker from './SwatchPicker'
import swatchImages from '../static/assets/images/fpo-swatches'
import { setLensColor, setSwatchType } from '../store/actions'
import { SwatchType, LensColor } from '../store/types'

function toggleHighIndexAddOn() {}

function tempSwatch(value: SwatchType, imageUrl: string) {
  return { imageUrl, value }
}

function tempSelectOption(value: string) {
  return { text: value, value }
}

// TODO: Move these to config or ENV
const lensOptions: any[] = []
const lensPickerOptions: any[] = [
  tempSwatch('lens-gray', swatchImages.lensGray),
  tempSwatch('lens-green', swatchImages.lensGreen),
  tempSwatch('lens-brown', swatchImages.lensBrown),
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
  tempSwatch('eyeglass-black', swatchImages.eyeglassBlack),
  tempSwatch('eyeglass-tortoise', swatchImages.eyeglassTortoise),
  tempSwatch('eyeglass-clear', swatchImages.eyeglassClear),
  tempSwatch('sunglass-black', swatchImages.sunglassBlack),
  tempSwatch('sunglass-tortoise', swatchImages.sunglassTortoise),
  tempSwatch('sunglass-clear', swatchImages.sunglassClear),
]

const tintOptions: any[

] = []

function SideRight(): ReactElement {
  const { hasHighIndexAddOn, lensColor, swatchType, title } = useSelector((state: RootState) => state.app.product)

  const dispatch = useDispatch()

  const total = 395

  return (
    <div className="zw-right">
      <div className="zw-product-options">
        <h2>{ title }</h2>
        <div className="zw-primary-picker">
          <SwatchPicker
            onChange={(value: SwatchType) => dispatch(setSwatchType(value))}
            options={swatchPickerOptions}
            title="Frame color:"
            value={ swatchType }
          />
        </div>
        <div className="zw-lens-picker">
          <SwatchPicker
            onChange={(value: LensColor) => dispatch(setLensColor(value))}
            options={lensPickerOptions}
            title="Lens color:"
            value={ lensColor }
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
