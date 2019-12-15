import { IProductOption } from '../store/types'

declare const PDP_WIDGET_TINT_ADD_ON_PRODUCT: string

function getTintOptions() {
  const product = JSON.parse(PDP_WIDGET_TINT_ADD_ON_PRODUCT)

  if (!product) return []
  if (!product.variants.length) return []

  return product.variants.reduce((acc: IProductOption[], variant: any) => {
    const price = variant.price / 100

    acc.push({
      name: variant.public_title,
      price,
    })

    return acc
  }, [{
    name: 'None',
    price: 0,
  }])
}

export default getTintOptions
