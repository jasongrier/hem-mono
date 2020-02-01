declare const PDP_WIDGET_LENS_TREATMENT_ADD_ON_PRODUCT: string

function getLensTreatmentOptions() {
  const product = JSON.parse(PDP_WIDGET_LENS_TREATMENT_ADD_ON_PRODUCT)

  if (!product) return []
  if (!product.variants.length) return []

  const options = product.variants.map(({ public_title, price }) => public_title + ' +$' + price / 100)
  return ['Standard'].concat(options)
}

export default getLensTreatmentOptions
