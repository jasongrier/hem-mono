import { put, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import { getCookieName } from '../app'
import { LOG_IN, LOG_OUT, LOG_IN_CHECK_REQUEST, LOG_IN_CHECK_RESULT } from './index'

function* checkLoginCookie() {
  const cookieValue = Cookies.get(getCookieName('logged-in'))
  yield put({ type: LOG_IN_CHECK_RESULT, payload: cookieValue === 'true' })
}

function* setLoginCookie() {
  Cookies.set(getCookieName('logged-in'), 'true')
}

function* unsetLoginCookie() {
  Cookies.remove(getCookieName('logged-in'))
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
