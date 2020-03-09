import { IProduct } from '../store/types'
import { find } from 'lodash'
import { titleCase } from 'voca'
import getProductOptions from './get-product-options'
import getTintOptions from './get-tint-options'

declare const PDP_WIDGET_PRODUCT: string

function getProduct(): IProduct {
  const rawProduct = JSON.parse(PDP_WIDGET_PRODUCT)
  const themeOptions = getProductOptions('Theme')

  let theme
  if (window.location.search) {
    const urlSplit = window.location.search.split('preselected-theme=')

    if (urlSplit[1]) {
      theme = titleCase(urlSplit[1].split('&')[0].replace(/-/g, ' '))
    }

    else {
      theme = themeOptions[0]
    }
  }

  else {
    theme = themeOptions[0]
  }

  console.log('**********')
  console.log(getProductOptions('Prescription', { theme, lensColor: 'NA' }, true, true)[0])
  console.log('**********')

  const themeUppercase = titleCase(theme).replace(/-/g, ' ')
  const lensColor = theme.includes('Sunglass') ? 'Gray Lens' : 'NA'

  return {
    basePrice: rawProduct.price / 100,
    defaultImageUrl: rawProduct.images[0],
    description: rawProduct.description,
    hasHighIndexAddOn: false,
    id: null,
    lensColor,
    lensTreatment: 'Standard',
    optionNames: rawProduct.options,
    prescription: getProductOptions('Prescription', { theme, lensColor }, true)[0],
    prescriptionFile: null,
    theme: themeUppercase,
    tint: getTintOptions()[0],
    title: rawProduct.title,
  }
}

export default getProduct
