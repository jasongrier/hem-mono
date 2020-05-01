import { call, put, select, takeLatest } from 'redux-saga/effects'
import $ from 'jquery'
import {
  SHOPIFY_ADD_TO_CART,
} from './index'

function* shopifyCheckOut({ payload }: any) {
  const { productHandle, price } = payload

  try {
    const data = yield call(() =>
      fetch(`http://localhost:8888/pricing.php?product_handles=${productHandle}&prices=${price}`)
        .then(res => res.json())
        .then(myJson => myJson)
    )

    // POST to /cart/add.js like in Zak
    // Show a popup? Or redirect to cart right away?
    // If popup, then bring back the "checkout now" button

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
