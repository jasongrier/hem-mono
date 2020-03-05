declare const PDP_WIDGET_PRODUCT: string

function getThemeAvailability(theme: any, rawProduct?: any) {
  rawProduct = rawProduct || JSON.parse(PDP_WIDGET_PRODUCT)

  console.log(theme)

  // Only frame colors can be sold out
  // The admin must be configured so that all variants with the sold-out frame color are unavailable
  // (Prescriptions and lens colors never get sold out, but sunglasses and eyeglasses have different lens color options)
  let lensColor
  if (theme.includes('Eyeglass')) {
    lensColor = 'NA'
  }

  else {
    lensColor = 'Gray Lens'
  }

  const checkTitle = `No Prescription / ${lensColor} / ${theme}`
  const testVariant = rawProduct.variants.find((variant: any) => variant.public_title === checkTitle)

  if (!testVariant) return false

  return testVariant.available
}

export default getThemeAvailability
