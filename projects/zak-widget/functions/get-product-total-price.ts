import { IProduct } from '../store/types'
import getHighIndexOption from './get-high-index-option'

function getHighIndexPrice(): number {
  const option = getHighIndexOption()

  if (option) {
    return option.price
  }

  return 0
}

function getProductTotalPrice(product: IProduct) {
  return (
      product.prescription.price
      + product.lensTreatment.price
      + product.tint.price
      + (product.hasHighIndexAddOn ? getHighIndexPrice() : 0)
  )
}

export default getProductTotalPrice
