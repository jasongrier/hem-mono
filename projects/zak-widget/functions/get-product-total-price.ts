import { IProduct } from '../store/types'
import getPrescriptionOptions from './get-product-options/get-prescription-options'
import getHighIndexOption from './get-product-options/get-high-index-option'
import getLensTreatmentOptions from './get-product-options/get-lens-treatment-options'
import getTintOptions from './get-product-options/get-tint-options'

function getPrescriptionPrice(value: string): number {
  const option = getPrescriptionOptions().find(o => o.value === value)

  if (option) {
    return option.price
  }

  return 0
}

function getLensTreatmentPrice(value: string): number {
  const option = getLensTreatmentOptions().find(o => o.value === value)

  if (option) {
    return option.price
  }

  return 0
}

function getTintPrice(value: string): number {
  const option = getTintOptions().find(o => o.value === value)

  if (option) {
    return option.price
  }

  return 0
}

function getHighIndexPrice(): number {
  const option = getHighIndexOption()

  if (option) {
    return option.price
  }

  return 0
}

function getProductTotalPrice(product: IProduct) {
  return (
    product.basePrice
      + getPrescriptionPrice(product.prescriptionType)
      + getLensTreatmentPrice(product.lensTreatmentType)
      + getTintPrice(product.tintType)
      + (product.hasHighIndexAddOn ? getHighIndexPrice() : 0)
  )
}

export default getProductTotalPrice
