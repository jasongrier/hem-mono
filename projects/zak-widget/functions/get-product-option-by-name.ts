import getHighIndexOption from './get-high-index-option'
import getProductOptions from './get-product-options'
import getTintOptions from './get-tint-options'
import { IProductOption } from '../store/types'

function getProductOptionByName(optionName: string) {
  const highIndexOption = getHighIndexOption()
  const lensTreatmentOptions = getProductOptions('Lens Treatment')
  const prescriptionOptions = getProductOptions('Prescription')
  const tintOptions = getTintOptions()

  const allOptions: IProductOption[] = []
    .concat(highIndexOption)
    .concat(lensTreatmentOptions)
    .concat(prescriptionOptions)
    .concat(tintOptions)

  return allOptions.find(option => option.name === optionName)
}

export default getProductOptionByName
