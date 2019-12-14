import { kebabCase } from 'voca'
import { IProductOption, TintType } from '../../store/types'

declare const PDP_WIDGET_TINT_ADD_ON_PRODUCT: string

function getTintOptions() {
  const product = JSON.parse(PDP_WIDGET_TINT_ADD_ON_PRODUCT)

  if (!product) return []
  if (!product.variants.length) return []

  return product.variants.reduce((acc: IProductOption[], variant: any, index: number) => {

    acc.push({
      index,
      price: variant.price / 100,
      text: `${variant.public_title} $${variant.price / 100}`,
      value: kebabCase(variant.public_title) as TintType,
    })

    return acc
  }, [{
    index: -1,
    price: 0,
    text: 'None',
    value: 'none',
  }])
}

export default getTintOptions
