import { call, put, select, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import {
  REQUEST_ACTIVE_LIVE_STREAM,
  SET_COOKIE_APPROVAL,
  SET_COOKIE_PREFERENCES_SET,

  setActiveLiveStream as setActiveLiveStreamAc
} from './index'
import { getCookieName } from './functions'

function* requestActiveLiveStream() {
  try {
    const assetHost = window.location.hostname === 'localhost'
      ? 'http://localhost:8888'
      : 'http://static.hem.rocks'

    const res = yield call(fetch, `${assetHost}/hem-rocks/state/state.json`)
    const state = yield res.json()

    yield put(setActiveLiveStreamAc(state.activeLiveStream))
  }

  catch (err) {
    console.log(err)
  }
}

function* writeCookieApprovalCookie({ payload }: any) {
  try {
    const { approval, cookieName, write } = payload
    if (approval && write) {
      Cookies.set(getCookieName(`${cookieName}-cookie-approved`), 'true')
    }
  }

  catch (err) {
    console.log(err)
  }
}

function* writeCookiePreferencesSetCookie({ payload }: any) {
  try {
    const { value, write } = payload
    if (value && write) {
      Cookies.set(getCookieName('cookie-preferences-set'), 'true')
    }
  }

  catch (err) {
    console.log(err)
  }
}

//--//

function* requestActiveLiveStreamSaga() {
  yield takeLatest(REQUEST_ACTIVE_LIVE_STREAM, requestActiveLiveStream)
  yield takeLatest(SET_COOKIE_APPROVAL, writeCookieApprovalCookie)
  yield takeLatest(SET_COOKIE_PREFERENCES_SET, writeCookiePreferencesSetCookie)
}

export {
  requestActiveLiveStreamSaga,
}
