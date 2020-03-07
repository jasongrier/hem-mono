import { IState } from '../../store/types'
import getCurrentVariant from '../get-current-variant'
import getProductOptions from '../get-product-options'
import isProductEyeglass from '../is-product-eyeglass'
import removePrice from '../remove-price'

function applyProductRestrictions(draftState: IState) {
  if (removePrice(draftState.product.prescription) === 'No Prescription') {
    draftState.product.hasHighIndexAddOn = false
  }

  if (draftState.product.lensTreatment !== 'Standard') {
    draftState.product.tint = 'None'
  }

  if (isProductEyeglass(draftState.product)) {
    draftState.product.lensColor = 'NA'
  }

  if (!isProductEyeglass(draftState.product)) {
    draftState.product.lensTreatment = 'Standard'
    if (draftState.product.lensColor === 'NA') {
      draftState.product.lensColor = 'Gray Lens'
    }
    draftState.product.tint = 'None'
  }

  const currentPrescription = removePrice(draftState.product.prescription)
  const productOptions = getProductOptions('Prescription', draftState.product, true)

  draftState.product.prescription = productOptions.find(
    optionName => optionName.indexOf(currentPrescription) === 0
  )

  const currentVariant = getCurrentVariant(draftState.product)
  draftState.product.id = currentVariant.id
}

export default applyProductRestrictions
