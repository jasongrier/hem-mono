import { call, put, select, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import uuid from 'uuid/v1'
import { getCookieName } from '../app'
import { assetHostHostname } from '../../functions'
import {
  ADD_PRODUCT_TO_CART,
  CLEAR_CART,
  REMOVE_PRODUCT_FROM_CART,
  SUBMIT_SALE,
  REQUEST_SALE,

  setCurrentSale as setCurrentSaleAc,
} from './index'

function* requestSale({ payload: saleId }: any) {
  try {
    const res = yield call(fetch, assetHostHostname() + '/hem-rocks/api/?hem-cmd=get-sale&sid=' + saleId)
    const sale = yield res.json()

    yield put(setCurrentSaleAc(sale))
  }

  catch (err) {
    console.log(err)
  }
}

function* saveCart() {
  try {
    const state = yield select()
    Cookies.set(getCookieName('cart'), JSON.stringify(state.cart.products))
  }

  catch (err) {
    console.log(err)
  }
}

function* submitSale({ payload: saleId }: any) {
  try {
    const form = document.getElementById('pay-pal-cart-upload-form')

    // TODO: websiteHostName() helper fn...
    const websiteHostName = window.location.hostname === 'localhost'
      ? 'http://localhost:1234'
      : 'http://hem.rocks'

    if (!form) throw new Error('Form not found')

    const state = yield select()
    const { products } = state.cart

    yield call(
      fetch,
      assetHostHostname() + '/hem-rocks/api/?hem-cmd=new-sale',
      {
        body: JSON.stringify({ products, saleId }),
        method: 'post',
      }
    )

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
