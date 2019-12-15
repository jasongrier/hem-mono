import { IProductOption } from '../store/types'

function productOptionToTitle(productOption: IProductOption, plusPrice: boolean = false): string {
  const name = productOption.name
  const price = productOption.price > 0 && productOption.price
  const priceString = price ? (' – ' + (plusPrice ? '+' : '') + '$' + price) : ''

  return `${name}${priceString}`
}

export default productOptionToTitle
