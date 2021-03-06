import { call, put, select, takeLatest } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import { assetHostHostname } from '../../../functions'
import { SET_COOKIE_APPROVAL, SET_COOKIE_PREFERENCES_SET } from './index'
import { getCookieName } from './functions'

function* writeCookieApprovalCookie({ payload }: any) {
  const { approval, cookieName, write } = payload
  const state = yield select()

  try {
    if (approval && write) {
      Cookies.set(getCookieName(`${cookieName}-cookie-approved`, state.content.currentProject), 'true')
    }
  }

  catch (err) {
    console.log(err)
  }

  try {
    yield call(
      fetch,
      `${assetHostHostname()}/hem.rocks/api/?hem-cmd=cookie-approval`,
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
    const state = yield select()

    if (value && write) {
      Cookies.set(getCookieName('cookie-preferences-set', state.content.currentProject), 'true')
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
