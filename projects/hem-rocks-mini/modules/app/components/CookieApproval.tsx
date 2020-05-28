import React, { ReactElement, useCallback, useState, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCookieApproval, setCookiePreferencesSet } from '../index'
import { RootState } from '../../../index'

function CookieApproval(): ReactElement {
  const { cookiePreferencesSet } = useSelector((state: RootState) => ({
    cookiePreferencesSet: state.app.cookiePreferencesSet,
  }))

  const dispatch = useDispatch()

  const [popupOpen, setPopupOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const setAnalyticsCookieApprovalOnClick = useCallback(
    function setAnalyticsCookieApprovalOnClickFn(evt: SyntheticEvent<HTMLInputElement>) {
      setAnalytics(!analytics)
    }, [analytics],
  )

  const setMarketingCookieApprovalOnClick = useCallback(
    function setMarketingCookieApprovalOnClickFn(evt: SyntheticEvent<HTMLInputElement>) {
      setMarketing(!marketing)
    }, [marketing],
  )

  const acceptAllCookiesOnClick = useCallback(
    function acceptAllCookiesOnClickFn(evt: SyntheticEvent<HTMLButtonElement>) {
      dispatch(setCookieApproval('Analytics', true, true))
      dispatch(setCookieApproval('Marketing', true, true))
      dispatch(setCookiePreferencesSet())
    }, [],
  )

  const editCookiesOnClick = useCallback(
    function editCookiesOnClickFn(evt: SyntheticEvent<HTMLButtonElement>) {
      setPopupOpen(true)
    }, [],
  )

  const setCookiesPreferencesOnClick = useCallback(
    function setCookiesPreferencesOnClickFn(evt: SyntheticEvent<HTMLButtonElement>) {
      dispatch(setCookieApproval('Analytics', analytics, true))
      dispatch(setCookieApproval('Marketing', marketing, true))
      dispatch(setCookiePreferencesSet())
      setPopupOpen(false)
    }, [analytics, marketing],
  )

  const cancelAndCloseOnClick = useCallback(
    function cancelAndCloseOnClickFn(evt: SyntheticEvent<HTMLAnchorElement>) {
      setPopupOpen(false)
    }, [],
  )

  if (cookiePreferencesSet) return <div />

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
          <h2>Cookies Preferences</h2>

          <p>For information about cookies that are required for this website to operate correctly, please read our <a href="/static/html/cookies-policy.html" target="_blank">cookies policy</a>.</p>

          <p>You can choose to opt out of the following cookies:</p>

          <h3>Analytics cookies</h3>

          <p>
            <input
              onChange={setAnalyticsCookieApprovalOnClick}
              type="checkbox"
              value={analytics ? 'on' : 'off'}
            />
          </p>

          <p>Google Analytics is used to track usage of this website anonymously. Turning off will mean that your IP address is not sent to Google.</p>

          <h3>Marketing and advertising cookies</h3>

          <p>
            <input
              onChange={setMarketingCookieApprovalOnClick}
              type="checkbox"
              value={marketing ? 'on' : 'off'}
            />
          </p>

          <p>This site tracks activity, used for customised advertising across several services (Facebook, Twitter, Instagram). Turning off will mean that your activity is not sent to these services.</p>

          <p className="buttons">
            <button
              className="action-button"
              onClick={setCookiesPreferencesOnClick}
            >
              Set cookie preferences
            </button>
            <a
              href="#"
              onClick={cancelAndCloseOnClick}
            >
              Cancel and close
            </a>
          </p>
        </div>
      )}
    </>
  )
}

export default CookieApproval