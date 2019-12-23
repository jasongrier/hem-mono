import { call, put, select, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import { LOG_IN, LOG_OUT, LOG_IN_CHECK_REQUEST, LOG_IN_CHECK_RESULT } from './types'

function* checkLoginCookie() {
  const cookieValue = Cookies.get('hem-rocks-logged-in')
  yield put({ type: LOG_IN_CHECK_RESULT, payload: cookieValue === 'true' })
}

function* setLoginCookie() {
  console.log('setLoginCookie')
  Cookies.set('hem-rocks-logged-in', 'true')
}

function* unsetLoginCookie() {
  console.log('unsetLoginCookie')
  Cookies.set('hem-rocks-logged-in', null)
}

function* loginCheckSaga() {
  yield takeLatest(LOG_IN_CHECK_REQUEST, checkLoginCookie)
}

function* loginSaga() {
  yield takeLatest(LOG_IN, setLoginCookie)
}

function* logoutSaga() {
  yield takeLatest(LOG_OUT, unsetLoginCookie)
}

export {
  loginCheckSaga,
  loginSaga,
  logoutSaga,
}
