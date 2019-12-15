import { titleCase } from 'voca'
import { IProduct } from '../store/types'
import productOptionToTitle from './product-option-to-title'

declare const PDP_WIDGET_PRODUCT: string

function getCurrentVariant(product: IProduct) {
  const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)

  const variantTitle =
    productOptionToTitle(product.prescription) + ' / '
    + productOptionToTitle(product.lensTreatment, true) + ' / '
    + productOptionToTitle(product.frame, true)

  return rawProduct.variants.find(variant => variant.public_title === variantTitle)
}

export default getCurrentVariant
