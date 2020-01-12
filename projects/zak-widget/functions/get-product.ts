import { IProduct } from '../store/types'
import getProductOptions from './get-product-options'
import getTintOptions from './get-tint-options'

declare const PDP_WIDGET_PRODUCT: string

function getProduct(): IProduct {
  const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)
  const theme = getProductOptions('Theme')[0]

  return {
    basePrice: rawProduct.price / 100,
    defaultImageUrl: rawProduct.images[0],
    description: rawProduct.description,
    hasHighIndexAddOn: false,
    id: null,
    lensColor: 'NA',
    lensTreatment: 'Standard',
    optionNames: rawProduct.options,
    prescription: getProductOptions('Prescription', { theme, lensColor: 'NA' }, true)[0],
    prescriptionFile: null,
    theme,
    tint: getTintOptions()[0],
    title: rawProduct.title,
  }
}

export default getProduct
