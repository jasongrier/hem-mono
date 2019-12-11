import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import OptionRow from './OptionRow'
import SwatchPicker from './SwatchPicker'
import { getOptionPricing, getProductTotalPrice } from '../functions'
import swatchImages from '../static/assets/images/fpo-swatches'
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

  IPrescription,
  TintType,
} from '../store/types'

function tempSwatch(value: SwatchType, imageUrl: string) {
  return { imageUrl, value }
}

const lensTreatmentOptions: any[] = [
  {
    text: `Standard`,
    price: getOptionPricing('lensTreatmentPrices', 'standard'),
    value: 'standard',
  },
  {
    text: `Traditional Lens $${getOptionPricing('lensTreatmentPrices', 'traditional-lens')}`,
    price: getOptionPricing('lensTreatmentPrices', 'traditional-lens'),
    value: 'traditional-lens',
  },
  {
    text: `Blue AR Coating $${getOptionPricing('lensTreatmentPrices', 'blue-ar-coating')}`,
    price: getOptionPricing('lensTreatmentPrices', 'blue-ar-coating'),
    value: 'blue-ar-coating',
  },
]

const lensPickerOptions: any[] = [
  tempSwatch('lens-gray', swatchImages.lensGray),
  tempSwatch('lens-green', swatchImages.lensGreen),
  tempSwatch('lens-brown', swatchImages.lensBrown),
]

const prescriptionOptions: IPrescription[] = [
  {
    text: `Single Vision $${getOptionPricing('prescriptionPrices', 'single-vision')}`,
    price: getOptionPricing('prescriptionPrices', 'single-vision'),
    value: 'single-vision',
  },
  {
    text: `Progressive $${getOptionPricing('prescriptionPrices', 'progressive')}`,
    price: getOptionPricing('prescriptionPrices', 'progressive'),
    value: 'progressive',
  },
  {
    text: `No Prescription $${getOptionPricing('prescriptionPrices', 'single-vision')}`,
    price: getOptionPricing('prescriptionPrices', 'no-prescription'),
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

const tintOptionsOrder = [
  'none',
  'rose',
  'orange',
  'yellow',
  'blue',
  'lime',
  'purple',
  'gradient-rose',
  'gradient-blue',
  'gradient-green',
  'gradient-brown',
  'gradient-light-gray',
  'gradient-dark-gray',
  'mirror-orange',
  'mirror-blue',
  'mirror-lavender',
  'mirror-gold',
  'mirror-silver',
  'mirror-black',
]

const tintOptionsUnordered: any[] = [
  {
    price: getOptionPricing('tintPrices', 'blue'),
    text: `Blue $${getOptionPricing('tintPrices', 'blue')}`,
    value: 'blue',
  },
  {
    price: getOptionPricing('tintPrices', 'gradient-blue'),
    text: `Gradient Blue $${getOptionPricing('tintPrices', 'gradient-blue')}`,
    value: 'gradient-blue',
  },
  {
    price: getOptionPricing('tintPrices', 'gradient-brown'),
    text: `Gradient Brown $${getOptionPricing('tintPrices', 'gradient-brown')}`,
    value: 'gradient-brown',
  },
  {
    price: getOptionPricing('tintPrices', 'gradient-dark-gray'),
    text: `Gradient Dark Gray $${getOptionPricing('tintPrices', 'gradient-dark-gray')}`,
    value: 'gradient-dark-gray',
  },
  {
    price: getOptionPricing('tintPrices', 'gradient-green'),
    text: `Gradient Green $${getOptionPricing('tintPrices', 'gradient-green')}`,
    value: 'gradient-green',
  },
  {
    price: getOptionPricing('tintPrices', 'gradient-light-gray'),
    text: `Gradient Light Gray $${getOptionPricing('tintPrices', 'gradient-light-gray')}`,
    value: 'gradient-light-gray',
  },
  {
    price: getOptionPricing('tintPrices', 'gradient-rose'),
    text: `Gradient Rose $${getOptionPricing('tintPrices', 'gradient-rose')}`,
    value: 'gradient-rose',
  },
  {
    price: getOptionPricing('tintPrices', 'lime'),
    text: `Lime $${getOptionPricing('tintPrices', 'lime')}`,
    value: 'lime',
  },
  {
    price: getOptionPricing('tintPrices', 'mirror-black'),
    text: `Mirror Black $${getOptionPricing('tintPrices', 'mirror-black')}`,
    value: 'mirror-black',
  },
  {
    price: getOptionPricing('tintPrices', 'mirror-blue'),
    text: `Mirror Blue $${getOptionPricing('tintPrices', 'mirror-blue')}`,
    value: 'mirror-blue',
  },
  {
    price: getOptionPricing('tintPrices', 'mirror-gold'),
    text: `Mirror Gold $${getOptionPricing('tintPrices', 'mirror-gold')}`,
    value: 'mirror-gold',
  },
  {
    price: getOptionPricing('tintPrices', 'mirror-lavender'),
    text: `Mirror Lavender $${getOptionPricing('tintPrices', 'mirror-lavender')}`,
    value: 'mirror-lavender',
  },
  {
    price: getOptionPricing('tintPrices', 'mirror-orange'),
    text: `Mirror Orange $${getOptionPricing('tintPrices', 'mirror-orange')}`,
    value: 'mirror-orange',
  },
  {
    price: getOptionPricing('tintPrices', 'mirror-silver'),
    text: `Mirror Silver $${getOptionPricing('tintPrices', 'mirror-silver')}`,
    value: 'mirror-silver',
  },
  {
    price: getOptionPricing('tintPrices', 'none'),
    text: `None`,
    value: 'none',
  },
  {
    price: getOptionPricing('tintPrices', 'orange'),
    text: `Orange $${getOptionPricing('tintPrices', 'orange')}`,
    value: 'orange',
  },
  {
    price: getOptionPricing('tintPrices', 'purple'),
    text: `Purple $${getOptionPricing('tintPrices', 'purple')}`,
    value: 'purple',
  },
  {
    price: getOptionPricing('tintPrices', 'rose'),
    text: `Rose $${getOptionPricing('tintPrices', 'rose')}`,
    value: 'rose',
  },
  {
    price: getOptionPricing('tintPrices', 'yellow'),
    text: `Yellow $${getOptionPricing('tintPrices', 'yellow')}`,
    value: 'yellow',
  },
]

const tintOptions = []

for (const optionType of tintOptionsOrder) {
  const foundOption = tintOptionsUnordered.find(option => option.value === optionType)
  if (foundOption) {
    tintOptions.push(foundOption)
  }

  else {
    console.log(optionType)
  }
}

function SideRight(): ReactElement {
  const product = useSelector((state: RootState) => state.app.product)
  const {
    hasHighIndexAddOn,
    lensColor,
    lensTreatmentType,
    prescriptionType,
    swatchType,
    tintType,
    title,
  } = product

  const dispatch = useDispatch()

  const total = getProductTotalPrice(product)

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
          action={{
            onClick: () => {},
            text: 'Do you have questions?',
          }}
          select={{
            onChange: (value: PrescriptionType) => dispatch(setPrescriptionType(value)),
            options: prescriptionOptions,
            value: prescriptionType,
          }}
        />
        <OptionRow
          action={{
            onClick: () => {},
            text: 'What’s right for me?',
          }}
          select={{
            onChange: (value: LensTreatmentType) => dispatch(setLensTreatmentType(value)),
            options: lensTreatmentOptions,
            value: lensTreatmentType,
          }}
        />
        <OptionRow
          className="zw-last-option-row"
          action={{
            onClick: () => {},
            text: 'Customize it!',
          }}
          select={{
            onChange: (value: TintType) => dispatch(setTintType(value)),
            options: tintOptions,
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
