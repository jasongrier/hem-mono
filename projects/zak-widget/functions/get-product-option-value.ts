import getHighIndexOption from './get-high-index-option'
import getProductOptions from './get-product-options'
import getTintOptions from './get-tint-options'
import { IProductOption } from '../store/types'

function getProductOptionValue(optionName: string, optionValueName: string): IProductOption {
  let optionGroup

  if (optionName === 'High Index Lens') {
    optionGroup = getHighIndexOption()
  }

  else if (optionName === 'Tint') {
    optionGroup = getTintOptions()
  }

  else {
    optionGroup = getProductOptions(optionName)
  }

  if (!optionGroup) throw new Error('No option group found for option name: ' + optionName)

  const optionValue = optionGroup.find(option => option.name === optionValueName)

  if (!optionGroup) throw new Error('No option value found for option name: ' + optionValueName)

  return optionValue
}

export default getProductOptionValue
