import { getOptionPricing } from './functions'
import { IPrescriptionOption } from './store/types'
import { ICustomSelectOption } from './components/CustomSelect'

const LENS_OPTIONS: any[] = [
  'lens-gray',
  'lens-green',
  'lens-brown',
]

const LENS_TREATMENT_OPTIONS: any[] = [
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

const PRESCRIPTION_OPTIONS: IPrescriptionOption[] = [
  {
    index: 1,
    text: `Single Vision $${getOptionPricing('prescriptionPrices', 'single-vision')}`,
    price: getOptionPricing('prescriptionPrices', 'single-vision'),
    value: 'single-vision',
  },
  {
    index: 2,
    text: `Progressive $${getOptionPricing('prescriptionPrices', 'progressive')}`,
    price: getOptionPricing('prescriptionPrices', 'progressive'),
    value: 'progressive',
  },
  {
    index: 0,
    text: `No Prescription $${getOptionPricing('prescriptionPrices', 'single-vision')}`,
    price: getOptionPricing('prescriptionPrices', 'no-prescription'),
    value: 'no-prescription',
  },
]

const SWATCH_TYPES: any[] = [
  {
    id: 'eyeglass-black',
    text: 'Eyeglass Black',
  },
  {
    id: 'eyeglass-tortoise',
    text: 'Eyeglass Tortoise',
  },
  {
    id: 'eyeglass-clear',
    text: 'Eyeglass Clear',
  },
  {
    id: 'sunglass-black',
    text: 'Sunglass Black',
  },
  {
    id: 'sunglass-tortoise',
    text: 'Sunglass Tortoise',
  },
  {
    id: 'sunglass-clear',
    text: 'Sunglass Clear',
  },
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

const TINT_OPTIONS: ICustomSelectOption[] = []

for (const optionType of tintOptionsOrder) {
  const foundOption = tintOptionsUnordered.find(option => option.value === optionType)
  if (foundOption) {
    TINT_OPTIONS.push(foundOption)
  }
}

export {
  LENS_OPTIONS,
  LENS_TREATMENT_OPTIONS,
  PRESCRIPTION_OPTIONS,
  SWATCH_TYPES,
  TINT_OPTIONS,
}

