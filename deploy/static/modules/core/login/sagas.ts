import { put, takeLatest, select } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import { getCookieName } from '../app'
import { LOG_IN, LOG_OUT, LOG_IN_CHECK_REQUEST, LOG_IN_CHECK_RESULT } from './index'

function* checkLoginCookie() {
  const state = yield select()
  const cookieValue = Cookies.get(getCookieName('logged-in', state.content.currentProject))
  yield put({ type: LOG_IN_CHECK_RESULT, payload: cookieValue === 'true' })
}

function* setLoginCookie() {
  const state = yield select()
  Cookies.set(getCookieName('logged-in', state.content.currentProject), 'true', { expires: 0.5 })
}

function* unsetLoginCookie() {
  const state = yield select()
  Cookies.remove(getCookieName('logged-in', state.content.currentProject))
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
