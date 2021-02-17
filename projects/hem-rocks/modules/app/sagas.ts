import { call, put, select, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import { assetHostHostname } from '../../functions'
import {
  SET_COOKIE_APPROVAL,
  SET_COOKIE_PREFERENCES_SET,
} from './index'
import { getCookieName } from './functions'

function* writeCookieApprovalCookie({ payload }: any) {
  const { approval, cookieName, write } = payload

  try {
    if (approval && write) {
      Cookies.set(getCookieName(`${cookieName}-cookie-approved`), 'true')
    }
  }

  catch (err) {
    console.log(err)
  }

  try {
    yield call(
      fetch,
      `${assetHostHostname()}/hem-rocks/api/?hem-cmd=cookie-approval`,
      {
        body: JSON.stringify({ approval, cookieName }),
        method: 'post',
      }
    )
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

function* appSaga() {
  yield takeLatest(SET_COOKIE_APPROVAL, writeCookieApprovalCookie)
  yield takeLatest(SET_COOKIE_PREFERENCES_SET, writeCookiePreferencesSetCookie)
}

export {
  appSaga,
}
