import { IProduct } from '../store/types'
import getHighIndexOption from './get-high-index-option'
import extractPrice from './extract-price'

function getProductTotalPrice(product: IProduct) {
  const highIndexOption = getHighIndexOption()

  return (
    extractPrice(product.prescription)
    + extractPrice(product.lensTreatment)
    + extractPrice(product.tint)
    + (product.hasHighIndexAddOn ? extractPrice(highIndexOption) : 0)
  )
}

export default getProductTotalPrice
