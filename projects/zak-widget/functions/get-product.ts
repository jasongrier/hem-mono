import { IProduct } from '../store/types'
import getProductOptions from './get-product-options'
import getProductSecondaryTitle from './get-product-secondary-title'
import getTintOptions from './get-tint-options'

declare const PDP_WIDGET_PRODUCT: string

function getProduct(): IProduct {
  const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)

  return {
    basePrice: rawProduct.price / 100,
    defaultImageUrl: rawProduct.images[0],
    description: rawProduct.description,
    frame: getProductOptions('Frame')[0],
    hasHighIndexAddOn: false,
    id: rawProduct.id,
    lensColor: 'lens-gray' as 'lens-gray',
    lensTreatment: getProductOptions('Lens Treatment')[0],
    optionNames: rawProduct.options,
    prescription: getProductOptions('Prescription')[0],
    prescriptionFile: null,
    secondaryTitle: getProductSecondaryTitle(rawProduct),
    tint: getTintOptions()[0],
    title: rawProduct.title,
  }
}

export default getProduct
