import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import OptionRow from './OptionRow'
import SwatchPicker from './SwatchPicker'
import swatchImages from '../static/assets/images/fpo-swatches'
import {
  setLensColor,
  setPrescriptionType,
  setSwatchType
} from '../store/actions'
import { SwatchType, LensColor, IPrescription, PrescriptionType } from '../store/types'

function toggleHighIndexAddOn() {}

function tempSwatch(value: SwatchType, imageUrl: string) {
  return { imageUrl, value }
}

const lensOptions: any[] = []

const lensPickerOptions: any[] = [
  tempSwatch('lens-gray', swatchImages.lensGray),
  tempSwatch('lens-green', swatchImages.lensGreen),
  tempSwatch('lens-brown', swatchImages.lensBrown),
]

const prescriptionPrices = {
  'single-vision': 1,
  'progressive': 2,
  'no-prescription': 3,
}

const prescriptionOptions: IPrescription[] = [
  {
    text: `Single Vision $${prescriptionPrices['single-vision']}`,
    price: prescriptionPrices['single-vision'],
    value: 'single-vision',
  },
  {
    text: `Progressive $${prescriptionPrices['progressive']}`,
    price: prescriptionPrices['progressive'],
    value: 'progressive',
  },
  {
    text: `No Prescription $${prescriptionPrices['no-prescription']}`,
    price: prescriptionPrices['no-prescription'],
    value: 'no-prescription',
  },
]

const swatchPickerOptions: any[] = [
  tempSwatch('eyeglass-black', swatchImages.eyeglassBlack),
  tempSwatch('eyeglass-tortoise', swatchImages.eyeglassTortoise),
  tempSwatch('eyeglass-clear', swatchImages.eyeglassClear),
  tempSwatch('sunglass-black', swatchImages.sunglassBlack),
  tempSwatch('sunglass-tortoise', swatchImages.sunglassTortoise),
  tempSwatch('sunglass-clear', swatchImages.sunglassClear),
]

const tintPrices = {
  'blue': 50,
  'gradient-blue': 50,
  'gradient-brown': 50,
  'gradient-dark-gray': 50,
  'gradient-green': 50,
  'gradient-light-gray': 50,
  'gradient-rose': 50,
  'lime': 50,
  'mirror-black': 75,
  'mirror-blue': 75,
  'mirror-gold': 75,
  'mirror-lavender': 75,
  'mirror-orange': 75,
  'mirror-silver': 75,
  'none': 0,
  'orange': 50,
  'purple': 50,
  'rose': 50,
  'yellow': 50,
}

const tintOptions: any[] = [
  {
    price: tintPrices['blue'],
    text: `Blue $${tintPrices['blue']}`,
    type: 'blue',
  },
  {
    price: tintPrices['gradient-blue'],
    text: `Gradient Blue $${tintPrices['gradient-blue']}`,
    type: 'gradient-blue',
  },
  {
    price: tintPrices['gradient-brown'],
    text: `Gradient Brown $${tintPrices['gradient-brown']}`,
    type: 'gradient-brown',
  },
  {
    price: tintPrices['gradient-dark-gray'],
    text: `Gradient Dark Gray $${tintPrices['gradient-dark-gray']}`,
    type: 'gradient-dark-gray',
  },
  {
    price: tintPrices['gradient-green'],
    text: `Gradient Green $${tintPrices['gradient-green']}`,
    type: 'gradient-green',
  },
  {
    price: tintPrices['gradient-light-gray'],
    text: `Gradient Light Gray $${tintPrices['gradient-light-gray']}`,
    type: 'gradient-light-gray',
  },
  {
    price: tintPrices['gradient-rose'],
    text: `Gradient Rose $${tintPrices['gradient-rose']}`,
    type: 'gradient-rose',
  },
  {
    price: tintPrices['lime'],
    text: `Lime $${tintPrices['lime']}`,
    type: 'lime',
  },
  {
    price: tintPrices['mirror-black'],
    text: `Mirror Black $${tintPrices['mirror-black']}`,
    type: 'mirror-black',
  },
  {
    price: tintPrices['mirror-blue'],
    text: `Mirror Blue $${tintPrices['mirror-blue']}`,
    type: 'mirror-blue',
  },
  {
    price: tintPrices['mirror-gold'],
    text: `Mirror Gold $${tintPrices['mirror-gold']}`,
    type: 'mirror-gold',
  },
  {
    price: tintPrices['mirror-lavender'],
    text: `Mirror Lavender $${tintPrices['mirror-lavender']}`,
    type: 'mirror-lavender',
  },
  {
    price: tintPrices['mirror-orange'],
    text: `Mirror Orange $${tintPrices['mirror-orange']}`,
    type: 'mirror-orange',
  },
  {
    price: tintPrices['mirror-silver'],
    text: `Mirror Silver $${tintPrices['mirror-silver']}`,
    type: 'mirror-silver',
  },
  {
    price: tintPrices['none'],
    text: `None`,
    type: 'none',
  },
  {
    price: tintPrices['orange'],
    text: `Orange $${tintPrices['orange']}`,
    type: 'orange',
  },
  {
    price: tintPrices['purple'],
    text: `Purple $${tintPrices['purple']}`,
    type: 'purple',
  },
  {
    price: tintPrices['rose'],
    text: `Rose $${tintPrices['rose']}`,
    type: 'rose',
  },
  {
    price: tintPrices['yellow'],
    text: `Yellow $${tintPrices['yellow']}`,
    type: 'yellow',
  },
]

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
          select={{ onChange: (value: PrescriptionType) => dispatch(setPrescriptionType(value)), options: prescriptionOptions, value: 'foo' }}
        />
        <OptionRow
          action={{ onClick: () => {}, text: 'What’s right for me?' }}
          select={{ onChange: () => {}, options: lensOptions, value: 'bar' }}
        />
        <OptionRow
          className="zw-last-option-row"
          action={{ onClick: () => {}, text: 'Customize it!' }}
          select={{ onChange: () => {}, options: tintOptions, value: 'bar' }}
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
