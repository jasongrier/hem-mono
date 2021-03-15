import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { CampaignMonitorForm } from '../../../../../lib/components'
import { AboutSubnav } from '../../../components/layout'
import { SiteText } from '../../../modules/core/content'
import { BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, BERLIN_STOCK_PHOTOS } from '../../../config'

function About(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-about page-with-subnav">
        <AboutSubnav />
        <h1>About HEM</h1>
        <div className="main-content-section first-main-content-section" style={{ color: 'black' }}>
          <SiteText textItemId="dc8240aa-4c8c-4d1b-ae9c-9f653815c82f" />
        </div>

        <div className="main-content-section">
          <h2>Find HEM online</h2>
          <p>
            <a href="https://web.facebook.com/humanearmusic/">Facebook</a>
          </p>
          <p>
            <a href=""></a>
            Twitter
          </p>
          {/* <p>GitHub</p> */}
          {/* <p>MixCloud</p> */}
          <p>Soundcloud</p>
          {/* <p>NPM</p> */}
          {/* <p>Patreon</p>
          <p>Kickstarter</p>
          <p>Indie Gogo</p> */}
        </div>

        <div className="main-content-section">
          <div className="inline-newsletter-form">
            <h2>Mailing List</h2>
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

        <div className="main-content-section">
          <h2>Cookies &amp; Privacy</h2>
          <p>You can update your cookies settings at any time <Link to="/cookie-settings">here</Link>.</p>
          <p>Read the cookies policy <Link to="/cookie-policy">here</Link></p>
          <p>Read the privacy policy <Link to="/privacy-policy">here</Link></p>
        </div>

        <div className="main-content-deva deva-clever-knight" />
      </div>
    </>
  )
}

export default About
