import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  SHOPIFY_CHECK_OUT,
} from './index'

function* shopifyCheckOut({ payload }: any) {
  const { productHandles, prices } = payload

  try {
    yield call(fetch, `http://localhost:8888/pricing.php?product_handles=${productHandles.join()}&prices=${prices.join()}`)
  } catch (err) {
    console.log(err)
  }
}

//--//

function* shopifyCheckOutSaga() {
  yield takeLatest(SHOPIFY_CHECK_OUT, shopifyCheckOut)
}

export {
  shopifyCheckOutSaga,
}
