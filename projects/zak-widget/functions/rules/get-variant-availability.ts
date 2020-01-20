import removePrice from '../remove-price'
import productOptionToTitle from '../product-option-to-title'

declare const PDP_WIDGET_PRODUCT: string

function getVariantAvailability(prescription, lensColor, theme) {
  const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)

  const variantPublicTitle =
    removePrice(productOptionToTitle(prescription)) + ' / '
    + removePrice(productOptionToTitle(lensColor, true)) + ' / '
    + removePrice(productOptionToTitle(theme, true))

  const variant = rawProduct.variants.find(variant => variant.public_title === variantPublicTitle)
  if (!variant) return false

  return variant.available
}

export default getVariantAvailability
