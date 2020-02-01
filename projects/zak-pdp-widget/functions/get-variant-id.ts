function getVariantId(product, variantTitle) {
  if (!product) return
  if (!product.variants) return

  const variant = product.variants.find(
    ({ title }) => title === variantTitle
  )

  if (!variant) return

  return variant.id
}

export default getVariantId
