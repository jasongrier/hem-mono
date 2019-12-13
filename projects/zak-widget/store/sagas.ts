import { put, takeLatest } from 'redux-saga/effects'
import { requestProduct, setProduct } from './actions'
import { REQUEST_PRODUCT } from './types'

function* fetchProduct({ payload: productId }: ReturnType<typeof requestProduct>) {
  const product = {
    basePrice: 1,
    description: `
      <p>Unisex. Classic proportions. Constructed with high quality acetate and adjusted for a symmetrical fit. Lightweight Polycarbonate lens, AR coating to block glare, and 100% UV-A and UV-B protection. Paired with Zak. case, cleaning cloth and spray.</p>
    `,
    hasHighIndexAddOn: false,
    id: 'temp-product',
    lensColor: 'lens-gray' as 'lens-gray',
    lensTreatmentType: 'standard' as 'standard',
    prescriptionType: 'single-vision' as 'single-vision',
    secondaryTitle: 'Thick. Tortoise.',
    swatchType: 'eyeglass-black' as 'eyeglass-black',
    swatchTypeText: 'Eyeglass, Black',
    title: 'The Round Eyeglass',
    tintType: 'none' as 'none',
  }

  yield put(setProduct(product))
}

function* fetchProductSaga() {
  yield takeLatest(REQUEST_PRODUCT, fetchProduct)
}

export {
  fetchProductSaga
}
