import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { BASE_SITE_TITLE } from '../../config'
import { AboutSubnav } from '../../components/layout'
import { CampaignMonitorForm } from '../../../../lib/components'
import { CAMPAIGN_MONITOR_FORM_ACTION, BERLIN_STOCK_PHOTOS, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, CAMPAIGN_MONITOR_FORM_ID, MAILING_LIST_TEXT } from '../../config'

function MailingList(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-mailing-list page-with-subnav">
        <h1>Mailing List</h1>
        <AboutSubnav />
        <div className="inline-newsletter-form first-main-content-section">
          <p>{ MAILING_LIST_TEXT }</p>
          <CampaignMonitorForm
            action={CAMPAIGN_MONITOR_FORM_ACTION}
            emailFieldName={CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME}
            id={CAMPAIGN_MONITOR_FORM_ID}
            onFormSubmitted={() => {
              ReactGA.event({
                category: 'User',
                action: 'Joined the mailing list from the mailing list page.',
              })
            }}
            submitButtonText="Sign me up!"
          />
        </div>
      </div>
    </>
  )
}

export default MailingList
