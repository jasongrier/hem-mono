import getVariantId from './get-variant-id'
import removePrice from './remove-price'
import { IProduct } from '../store/types'

declare const PDP_WIDGET_HIGH_INDEX_ADD_ON_PRODUCT: string
declare const PDP_WIDGET_LENS_TREATMENT_ADD_ON_PRODUCT: string
declare const PDP_WIDGET_LENS_TREATMENT_ADD_ON_PRODUCT_NOT_TAXABLE: string
declare const PDP_WIDGET_TINT_ADD_ON_PRODUCT: string
declare const PDP_WIDGET_TINT_ADD_ON_PRODUCT_NOT_TAXABLE: string

function allProductIds(mainProduct: IProduct) {
  const isTaxable = mainProduct.prescription.includes('No Prescription')

  const productIds: string[] = []

  productIds.push(mainProduct.id)

  if (mainProduct.hasHighIndexAddOn) {
    const addOnProduct = JSON.parse(PDP_WIDGET_HIGH_INDEX_ADD_ON_PRODUCT)

    if (
      addOnProduct
      && addOnProduct.variants
      && addOnProduct.variants[0]
    ) {
      productIds.push(addOnProduct.variants[0].id)
    }
  }

  if (mainProduct.lensTreatment !== 'Standard') {
    const addOnProduct = isTaxable
      ? JSON.parse(PDP_WIDGET_LENS_TREATMENT_ADD_ON_PRODUCT)
      : JSON.parse(PDP_WIDGET_LENS_TREATMENT_ADD_ON_PRODUCT_NOT_TAXABLE)

    const variantId = getVariantId(addOnProduct, removePrice(mainProduct.lensTreatment))

    if (variantId) {
      productIds.push(variantId)
    }
  }

  if (mainProduct.tint !== 'None') {
    const addOnProduct = isTaxable
      ? JSON.parse(PDP_WIDGET_TINT_ADD_ON_PRODUCT)
      : JSON.parse(PDP_WIDGET_TINT_ADD_ON_PRODUCT_NOT_TAXABLE)

    const variantId = getVariantId(addOnProduct, removePrice(mainProduct.tint))

    if (variantId) {
      productIds.push(variantId)
    }
  }

  return productIds
}

export default allProductIds
