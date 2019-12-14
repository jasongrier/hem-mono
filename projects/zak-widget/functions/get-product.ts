import { IProduct } from '../store/types'
import getProductSecondaryTitle from './get-product-secondary-title'

declare const PDP_WIDGET_PRODUCT: string

function getProduct(): IProduct {
  const testProduct = {
    basePrice: 1,
    description: `
      <p>Unisex. Classic proportions. Constructed with high quality acetate and adjusted for a symmetrical fit. Lightweight Polycarbonate lens, AR coating to block glare, and 100% UV-A and UV-B protection. Paired with Zak. case, cleaning cloth and spray.</p>
    `,
    hasHighIndexAddOn: false,
    id: 'temp-product',
    lensColor: 'lens-gray' as 'lens-gray',
    lensTreatmentType: 'standard' as 'standard',
    prescriptionType: 'single-vision' as 'single-vision',
    secondaryTitle: 'Thick. Tortoise.',
    swatchType: 'eyeglass-black' as 'eyeglass-black',
    swatchTypeText: 'Eyeglass, Black',
    title: 'The Round Eyeglass',
    tintType: 'none' as 'none',
  }

  const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)

  return {
    basePrice: 1,
    description: rawProduct.description,
    hasHighIndexAddOn: false,
    id: 'temp-product',
    lensColor: 'lens-gray' as 'lens-gray',
    lensTreatmentType: 'standard' as 'standard',
    prescriptionType: 'single-vision' as 'single-vision',
    secondaryTitle: getProductSecondaryTitle(rawProduct),
    swatchType: 'eyeglass-black' as 'eyeglass-black',
    swatchTypeText: 'Eyeglass, Black',
    title: rawProduct.title,
    tintType: 'none' as 'none',
  }
}

export default getProduct
