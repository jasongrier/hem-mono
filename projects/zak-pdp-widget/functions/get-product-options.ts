import { compact } from 'lodash'
import { IProduct } from '../store/types'

declare const PDP_WIDGET_PRODUCT_OPTIONS_WITH_VALUES: string
declare const PDP_WIDGET_PRODUCT: string

function getProductOptions(optionGroupName: string, product?: Partial<IProduct>, withPrice: boolean = false, log = false): string[] {
  const rawOptionGroups = JSON.parse(PDP_WIDGET_PRODUCT_OPTIONS_WITH_VALUES)
  const rawOptionGroup = rawOptionGroups.find(o => o.name === optionGroupName)

  if (!rawOptionGroup) return []
  if (!rawOptionGroup.values) return []

  if (withPrice) {
    log && console.log(1)
    const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)

    if (optionGroupName === 'Prescription') {
      log && console.log(2)
      return rawOptionGroup.values.map(optionName => {
        const variantPublicTitle = optionName + ' / ' + product.lensColor + ' / ' + product.theme
        const variant = rawProduct.variants.find(variant => variant.public_title === variantPublicTitle)
        log && console.log(product.lensColor)
        if (!variant) return optionName
        return optionName + ' – $' + (variant.price / 100)
      })
    }

    else if (optionGroupName === 'Lens Color') {
      log && console.log(3)
      return compact(rawOptionGroup.values.map(optionName => {
        if (optionName === 'NA') return
        const variantPublicTitle = product.prescription + ' / ' + optionName + ' / ' + product.theme
        const variant = rawProduct.variants.find(variant => variant.public_title === variantPublicTitle)
        if (!variant) return optionName
        return optionName
        // return optionName + ' – $' + (variant.price / 100)
      }))
    }
  }

  else {
    log && console.log(4)
    return rawOptionGroup.values
  }
}

export default getProductOptions
