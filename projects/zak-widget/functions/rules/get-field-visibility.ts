import { IProduct } from '../../store/types'
import {
  getHighIndexOption,
  getProductOptions,
  getTintOptions,
  isProductEyeglass,
  removePrice,
} from '../index'

function getFieldVisibility(product: IProduct) {
  const lensTreatmentOptions = getProductOptions('Lens Treatment', product, true)
  const prescriptionOptions = getProductOptions('Prescription', product, true)
  const tintOptions = getTintOptions()

  const showLensColorPicker = (
    !isProductEyeglass(product)
  )

  const showPrescriptionOptions = (
    prescriptionOptions
    && prescriptionOptions.length > 0
  )

  const showLensTreatmentOptions = (
    lensTreatmentOptions
    && lensTreatmentOptions.length > 0
    && isProductEyeglass(product)
  )

  const showTintOptions = (
    tintOptions
    && tintOptions.length > 0
    && isProductEyeglass(product)
    && removePrice(product.lensTreatment) !== 'Blue AR Coating'
    && removePrice(product.lensTreatment) !== 'Transitional Coating'
  )

  return {
    showLensColorPicker,
    showPrescriptionOptions,
    showLensTreatmentOptions,
    showTintOptions,
  }
}

export default getFieldVisibility
