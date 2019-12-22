import { IState } from '../store/types'

function applyProductRestrictions(draftState: IState) {
  if (draftState.product.prescription === 'No Prescription') {
    draftState.product.hasHighIndexAddOn = false
    draftState.product.lensTreatment = 'Standard'
    draftState.product.tint = 'None'
  }

  if (draftState.product.lensTreatment !== 'Standard') {
    draftState.product.tint = 'None'
  }
}

export default applyProductRestrictions
