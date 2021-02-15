import React, { ReactElement, useCallback, useState, SyntheticEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CookieSettings } from './index'
import { setCookieApproval, setCookiePreferencesSet } from '../index'
import { RootState } from '../../../index'
import { BERLIN_STOCK_PHOTOS } from '../../../config'

function CookieApproval(): ReactElement {
  const { cookiePreferencesSet } = useSelector((state: RootState) => ({
    cookiePreferencesSet: state.app.cookiePreferencesSet,
  }))

  const dispatch = useDispatch()

  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    if (!BERLIN_STOCK_PHOTOS) return
    dispatch(setCookieApproval('analytics', true, true))
    dispatch(setCookieApproval('marketing', true, true))
    dispatch(setCookiePreferencesSet(true, true))
  }, [])

  const acceptAllCookiesOnClick = useCallback(
    function acceptAllCookiesOnClickFn(evt: SyntheticEvent<HTMLButtonElement>) {
      dispatch(setCookieApproval('analytics', true, true))
      dispatch(setCookieApproval('marketing', true, true))
      dispatch(setCookiePreferencesSet(true, true))
    }, [],
  )

  const editCookiesOnClick = useCallback(
    function editCookiesOnClickFn(evt: SyntheticEvent<HTMLButtonElement>) {
      setPopupOpen(true)
    }, [],
  )

  if (cookiePreferencesSet || BERLIN_STOCK_PHOTOS) return <div />

  return (
    <>
      { !popupOpen && (
        <div className="cookie-approval-warning">
          <p>
            This site uses cookies. For information, please read our <a href="/static/html/cookies-policy.html" target="_blank">cookies policy</a>.
          </p>
          <button onClick={acceptAllCookiesOnClick}>
            Accept cookies
          </button>
          <button
            className="edit-cookies-button"
            onClick={editCookiesOnClick}
          >
            Edit cookies preferences
          </button>
        </div>
      )}
      { popupOpen && (
        <div className="cookie-approval-popup">
          <CookieSettings
            onSubmit={() => setPopupOpen(false)}
            onCancel={() => setPopupOpen(false)}
          />
        </div>
      )}
    </>
  )
}

export default CookieApproval
