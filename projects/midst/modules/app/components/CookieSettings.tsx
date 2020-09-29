import React, { ReactElement, useCallback, useState, SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { getCookieName, setCookieApproval, setCookiePreferencesSet } from '../index'

interface IProps {
  onSubmit?: () => void
  onCancel?: () => void
}

function CookieSettings({ onSubmit, onCancel }: IProps): ReactElement {
  const [analytics, setAnalytics] = useState(!!Cookies.get(getCookieName('analytics-cookie-approved')))
  const [marketing, setMarketing] = useState(!!Cookies.get(getCookieName('marketing-cookie-approved')))

  const dispatch = useDispatch()

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

  const setCookiesPreferencesOnClick = useCallback(
    function setCookiesPreferencesOnClickFn(evt: SyntheticEvent<HTMLButtonElement>) {
      dispatch(setCookieApproval('analytics', analytics, true))
      dispatch(setCookieApproval('marketing', marketing, true))
      dispatch(setCookiePreferencesSet(true, true))

      if (onSubmit) {
        onSubmit()
      }
    }, [analytics, marketing],
  )

  return (
    <div className="cookie-settings">
      <h2>Cookies Preferences</h2>

      <p>For information about cookies that are required for this website to operate correctly, please read our <a href="/static/html/cookies-policy.html" target="_blank">cookies policy</a>.</p>

      <p>You can choose to opt out of the following cookies:</p>

      <h3>Analytics cookies</h3>

      <p>
        <input
          onChange={setAnalyticsCookieApprovalOnClick}
          type="checkbox"
          checked={analytics}
        />
      </p>

      <p>Google Analytics is used to track usage of this website anonymously. Turning off will mean that your IP address is not sent to Google.</p>

      <h3>Marketing and advertising cookies</h3>

      <p>
        <input
          onChange={setMarketingCookieApprovalOnClick}
          type="checkbox"
          checked={marketing}
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
        { onCancel && (
          <a
            href="#"
            onClick={onCancel}
          >
            Cancel
          </a>
        )}
      </p>
    </div>
  )
}

export default CookieSettings
