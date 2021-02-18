import React, { useEffect, ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga'
import Cookies from 'js-cookie'
import { getCookieName, CookieApproval, setCookiePreferencesSet, setCookieApproval } from '../index'
import { CampaignMonitorForm, ElectronNot, NagToaster } from '../../../../../lib/components'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, MAILING_LIST_TEXT, BERLIN_STOCK_PHOTOS, PROJECT_CONFIGS } from '../../../config'
import { RootState } from '../../../index'

interface IProps {}

function CookiesFrame({}: IProps): ReactElement {
  const { cookiesAnalyticsApproved, cookiesMarketingApproved, currentProject } = useSelector((state: RootState) => ({
    cookiesAnalyticsApproved: state.app.cookiesAnalyticsApproved,
    cookiesMarketingApproved: state.app.cookiesMarketingApproved,
    currentProject: state.content.currentProject,
  }))

  const dispatch = useDispatch()

  useEffect(function init() {
    const cookiePreferencesSet = !!Cookies.get(getCookieName('cookie-preferences-set', currentProject))

    if (cookiePreferencesSet) {
      dispatch(setCookiePreferencesSet(true, false))
    }

    const cookieApprovals = [
      'analytics',
      'marketing',
    ]

    for (const name of cookieApprovals) {
      if (Cookies.get(getCookieName(`${name}-cookie-approved`, currentProject))) {
        dispatch(setCookieApproval(name, cookiePreferencesSet, false))
      }
    }
  }, [])

  useEffect(function checkAnalyticsCookieApproval() {
    if (cookiesAnalyticsApproved && !location.hostname.includes('localhost')) {
      const gaId = BERLIN_STOCK_PHOTOS ? 'UA-36136320-3' : 'UA-163585797-1'
      ReactGA.initialize(gaId)
    }
  }, [cookiesAnalyticsApproved])

  const nagHeader = PROJECT_CONFIGS[currentProject].NAG_HEADER
  const nagText = PROJECT_CONFIGS[currentProject].NAG_TEXT

  return (
    <>
      <CookieApproval />

      { cookiesMarketingApproved
        && !Cookies.get(getCookieName('cannot-show-email-nag', currentProject))
        && (
          <ElectronNot>
            <NagToaster
              closeIcon={CloseButton}
              delay={5000}
              id="hem-rocks-website-email-nag"
              onDismiss={() => {
                ReactGA.event({
                  category: 'User',
                  action: 'Closed the mailing list nag popup without joining.',
                })
              }}
              onLaunch={() => {
                ReactGA.event({
                  category: 'System',
                  action: 'The mailing list nag popped up.',
                })

                Cookies.set(getCookieName('cannot-show-email-nag', currentProject), 'true')
              }}
            >
              {() => (
                <>
                  { nagHeader && (
                    <h3>{ nagHeader }</h3>
                  )}

                  { nagText && (
                    <p>{ nagText }</p>
                  )}

                  <CampaignMonitorForm
                    action={CAMPAIGN_MONITOR_FORM_ACTION}
                    emailFieldName={CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME}
                    id={CAMPAIGN_MONITOR_FORM_ID}
                    onFormSubmitted={() => {
                      ReactGA.event({
                        category: 'User',
                        action: 'Joined the mailing list from the nag popup.',
                      })
                    }}
                    submitButtonText="Sign me up!"
                  />
                </>
              )}
            </NagToaster>
          </ElectronNot>
        )
      }
    </>
  )
}

export default CookiesFrame
