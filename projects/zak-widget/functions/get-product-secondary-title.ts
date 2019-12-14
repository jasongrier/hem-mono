import { titleCase } from 'voca'

function productSecondaryTitle(rawProduct: any) {
  let secondaryTitle = ''

  for(const tag of rawProduct.tags) {
    if (
      tag.includes('thin')
      || tag.includes('thick')
    ) {
      secondaryTitle += (titleCase(tag) + '. ')
    }
  }

  for(const tag of rawProduct.tags) {
    if (tag.includes('frame')) {
      secondaryTitle += (titleCase(tag).replace(' frame', '') + '. ')
    }
  }

  for(const tag of rawProduct.tags) {
    if (tag.includes('lens')) {
      secondaryTitle += (titleCase(tag) + '. ')
    }
  }

  if (rawProduct.type === 'Curated Sun') {
    secondaryTitle += (rawProduct.vendor + '. ')
  }

  return secondaryTitle
}

export default productSecondaryTitle
