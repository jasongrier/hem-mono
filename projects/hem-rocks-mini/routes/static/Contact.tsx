import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'
import { CampaignMonitorForm } from '../../../../lib/components'
import { CAMPAIGN_MONITOR_FORM_ID } from '../../config'

function Contact(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-info">
        <h1>Contact</h1>
        <div className="splash-image">
          <img src={`${assetHostHostname()}/hem-rocks/content/images/key-art/info-page.jpg`} alt="About HEM"/>
        </div>
        <p>
          Hot Extramusicality, Inc.<br />
          Reichenberger Straße 176<br />
          10999 Berlin<br />
          Deutschland<br />
          <br />
          Tel: +45 24 24 32 23<br />
          E-mail: info@hem.rocks
        </p>
        <h2>Newsletter</h2>
        <div className="inline-newsletter-form">
          <CampaignMonitorForm
            id={CAMPAIGN_MONITOR_FORM_ID}
            onFormSubmitted={() => {
              ReactGA.event({
                category: 'User',
                action: 'Joined the mailing list from the contact page.',
              })
            }}
            submitButtonText="Sign me up!"
          />
        </div>
      </div>
    </>
  )
}

export default Contact
