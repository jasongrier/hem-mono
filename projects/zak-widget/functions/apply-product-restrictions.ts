import { IState } from '../store/types'
import getProductOptions from './get-product-options'
import removePrice from './remove-price'

function applyProductRestrictions(draftState: IState) {
  if (draftState.product.prescription === 'No Prescription') {
    draftState.product.hasHighIndexAddOn = false
    draftState.product.lensTreatment = 'Standard'
    draftState.product.tint = 'None'
  }

  if (draftState.product.lensTreatment !== 'Standard') {
    draftState.product.tint = 'None'
  }

  const currentPrescription = removePrice(draftState.product.prescription)
  const productOptions = getProductOptions('Prescription', draftState.product, true)

  draftState.product.prescription = productOptions.find(
    optionName => optionName.indexOf(currentPrescription) === 0
  )
}

export default applyProductRestrictions
