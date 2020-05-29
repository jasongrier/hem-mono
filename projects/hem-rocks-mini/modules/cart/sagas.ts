import { call, put, select, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import { getCookieName } from '../app'
import {
  ADD_PRODUCT_TO_CART,
  CLEAR_CART,
  REMOVE_PRODUCT_FROM_CART,
} from './index'

function* saveCart() {
  try {
    const state = yield select()
    Cookies.set(getCookieName('cart'), JSON.stringify(state.cart.products))
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

export {
  addProductToCartSaga,
  clearCartSaga,
  removeProductFromCartSaga,
}
