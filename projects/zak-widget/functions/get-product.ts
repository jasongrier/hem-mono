import { IProduct } from '../store/types'
import getProductSecondaryTitle from './get-product-secondary-title'

declare const PDP_WIDGET_PRODUCT: string

function getProduct(): IProduct {
  const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)

  return {
    basePrice: rawProduct.price / 100,
    description: rawProduct.description,
    hasHighIndexAddOn: false,
    id: 'temp-product',
    lensColor: 'lens-gray' as 'lens-gray',
    lensTreatmentType: 'standard' as 'standard',
    mainImageUrl: rawProduct.images[0],
    prescriptionFile: null,
    prescriptionType: 'single-vision' as 'single-vision',
    secondaryTitle: getProductSecondaryTitle(rawProduct),
    swatchType: 'eyeglass-black' as 'eyeglass-black',
    swatchTypeText: 'Eyeglass, Black',
    title: rawProduct.title,
    tintType: 'none' as 'none',
  }
}

export default getProduct
