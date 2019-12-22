import { IProduct } from '../store/types'
import removePrice from './remove-price'
import productOptionToTitle from './product-option-to-title'

declare const PDP_WIDGET_PRODUCT: string

function getCurrentVariant(product: IProduct) {
  const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)

  const variantPublicTitle =
    removePrice(productOptionToTitle(product.prescription)) + ' / '
    + removePrice(productOptionToTitle(product.lensTreatment, true)) + ' / '
    + removePrice(productOptionToTitle(product.theme, true))

  const currentVariant = rawProduct.variants.find(variant => variant.public_title === variantPublicTitle)
  if (!currentVariant) throw new Error('Could not find a variant called ' + variantPublicTitle + '!')

  return currentVariant
}

export default getCurrentVariant
