import { IProduct } from "../store/types"

const highIndexPrices: any = {
  'yes': 75,
  'no': 0,
}

const lensTreatmentPrices: any = {
  'blue-ar-coating': 50,
  'standard': 0,
  'traditional-lens': 100,
}

const prescriptionPrices: any = {
  'single-vision': 1,
  'progressive': 2,
  'no-prescription': 3,
}

const tintPrices: any = {
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

const allPrices = {
  highIndexPrices,
  lensTreatmentPrices,
  prescriptionPrices,
  tintPrices,
}

function getOptionPricing(option: string, key: string): number {
  return allPrices[option][key]
}

function getProductTotalPrice(product: IProduct) {
  return (
    product.basePrice
      + getOptionPricing('highIndexPrices', product.hasHighIndexAddOn ? 'yes' : 'no')
      + getOptionPricing('lensTreatmentPrices', product.lensTreatmentType)
      + getOptionPricing('prescriptionPrices', product.prescriptionType)
      + getOptionPricing('tintPrices', product.tintType)
  )
}

export { getOptionPricing, getProductTotalPrice }
