declare const PDP_WIDGET_PRODUCT: string

function getVariant(variantName: string) {
  const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)
  console.log(rawProduct.variants)
}

export default getVariant
