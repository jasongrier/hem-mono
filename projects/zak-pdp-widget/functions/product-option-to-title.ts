declare const PDP_WIDGET_PRODUCT: string

function productOptionToTitle(productOption: string, plusPrice: boolean = false): string {
  const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)
  // console.log(rawProduct.variants)

  // const price = productOption.price > 0 && productOption.price
  // const priceString = price ? (' – ' + (plusPrice ? '+' : '') + '$' + price) : ''
  // return `${name}${priceString}`

  return productOption
}

export default productOptionToTitle
