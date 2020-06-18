import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'
import { CampaignMonitorForm } from '../../../../lib/components'
import { CAMPAIGN_MONITOR_FORM_ID } from '../../config'

function MailingList(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-mailing-list">
        <h1>Mailing List</h1>
        <div className="splash-image">
          <img src={`${assetHostHostname()}/hem-rocks/content/images/key-art/info-page.jpg`} alt="About HEM"/>
        </div>
        <div className="inline-newsletter-form">
          <CampaignMonitorForm
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
