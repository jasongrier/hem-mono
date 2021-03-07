import { call, put, select, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import { getCookieName } from '../app'
import { assetHostHostname } from '../../../functions'
import {
  ADD_PRODUCT_TO_CART,
  CLEAR_CART,
  REMOVE_PRODUCT_FROM_CART,
  SUBMIT_SALE,
  REQUEST_SALE,

  setCurrentSale as setCurrentSaleAc,
  setSaleRetrievalError as setSaleRetrievalErrorAc,

  IProduct,
} from './index'
import { BERLIN_STOCK_PHOTOS } from '../../../config'

function* requestSale({ payload: saleId }: any) {
  try {
    const res = yield call(fetch, assetHostHostname() + '/hem.rocks/api/?hem-cmd=get-sale&sid=' + saleId)
    const sale = yield res.json()
    yield put(setCurrentSaleAc(sale))
  }

  catch (err) {
    yield put(setSaleRetrievalErrorAc(true))
    console.log(err)
  }
}

function* saveCart() {
  try {
    const state = yield select()
    Cookies.set(getCookieName('cart', state.content.project), JSON.stringify(state.cart.products))
  }

  catch (err) {
    console.log(err)
  }
}

function* submitSale({ payload: saleId }: any) {
  try {
    // TODO: websiteHostName() helper fn...
    const websiteHostName = window.location.hostname === 'localhost'
      ? 'http://localhost:1234'
      : BERLIN_STOCK_PHOTOS ? 'http://berlinstockphotos.com' : 'http://hem.rocks'

    const state = yield select()
    const { products }: { products: IProduct[] } = state.cart

    yield call(
      fetch,
      assetHostHostname() + '/hem.rocks/api/?hem-cmd=new-sale',
      {
        body: JSON.stringify({ products, saleId }),
        method: 'post',
      }
    )

    const isInstantDownload = products.length === 1 && products[0].finalPrice === '0'

    if (isInstantDownload) return

    const form = document.getElementById('pay-pal-cart-upload-form')

    if (!form) throw new Error('Form not found')

    const saleIdField = document.createElement('input')
    const invoiceField = document.createElement('input')

    saleIdField.type = 'hidden'
    saleIdField.name = 'return'
    saleIdField.value = `${websiteHostName}/thank-you?sid=${saleId}`

    invoiceField.type = 'hidden'
    invoiceField.name = 'invoice'
    invoiceField.value = saleId

    form.appendChild(saleIdField)
    form.appendChild(invoiceField)

    // @ts-ignore
    form.submit()
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* addProductToCartSaga() {
  yield takeLatest(ADD_PRODUCT_TO_CART, saveCart)
}

function* clearCartSaga() {
  yield takeLatest(CLEAR_CART, saveCart)
}

function* removeProductFromCartSaga() {
  yield takeLatest(REMOVE_PRODUCT_FROM_CART, saveCart)
}

function* requestSaleSaga() {
  yield takeLatest(REQUEST_SALE, requestSale)
}

function* submitSaleSaga() {
  yield takeLatest(SUBMIT_SALE, submitSale)
}

export {
  addProductToCartSaga,
  clearCartSaga,
  removeProductFromCartSaga,
  requestSaleSaga,
  submitSaleSaga,
}
