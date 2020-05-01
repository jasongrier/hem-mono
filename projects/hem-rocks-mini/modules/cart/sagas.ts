import { call, put, select, takeLatest } from 'redux-saga/effects'
import $ from 'jquery'
import {
  SHOPIFY_ADD_TO_CART,
} from './index'

function* shopifyCheckOut({ payload }: any) {
  const { productHandle, price } = payload

  try {
    const res = yield call(fetch, `http://localhost:8888/pricing.php?product_handles=${productHandle.join()}&prices=${price.join()}`)

    console.log(JSON.parse(res))

  } catch (err) {
    console.log(err)
  }
}

//--//

function* shopifyCheckOutSaga() {
  yield takeLatest(SHOPIFY_ADD_TO_CART, shopifyCheckOut)
}

export {
  shopifyCheckOutSaga,
}
