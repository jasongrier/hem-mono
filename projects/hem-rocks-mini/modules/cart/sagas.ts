import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  SHOPIFY_CHECK_OUT,
} from './index'

declare const NODE_ENV: string

function* shopifyCheckOut({ payload }: any) {
  const { productHandles, prices } = payload

  try {
    const data = yield call(() => {
      let appUrl = `http://localhost:8888/pricing.php?product_handles=${productHandles.join()}&prices=${prices.join()}`

      if (process.env.NODE_ENV === 'development') {
        appUrl += '&dev_mode=true'
      }

      return fetch(appUrl)
        .then(res => {
          return res.json()
        })
        .then(data => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    })

    let location = ''

    if (process.env.NODE_ENV === 'development') {
      location += 'https://hem-web-shop-dev-j.myshopify.com/cart/'
    }

    else {
      location += 'https://hem-rocks.myshopify.com/cart/'
    }

    location += data.variants.map((variant: any) => variant.id + ':1').join()

    window.location.href = location

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
