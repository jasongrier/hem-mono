import { clone } from 'lodash'
import { IProduct, IState } from '../store/types'
import getProductOptionValue from './get-product-option-value'

function getProductWithRestrictions({ product }: IState): IProduct {
  // TODO: Does a mutation occur here?? Maybe just mutate here, since it's an immer draft anyway
  const draftProduct = clone(product)

  if (draftProduct.lensTreatment.name !== 'Standard') {
    draftProduct.tint = getProductOptionValue('Tint', 'None')
  }

  return draftProduct
}

export default getProductWithRestrictions
