import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { Header, Footer } from '../../components/berlin-stock-photos'
import { assetHostHostname } from '../../functions'
import { CampaignMonitorForm } from '../../../../lib/components'
import { CAMPAIGN_MONITOR_FORM_ACTION, BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, CAMPAIGN_MONITOR_FORM_ID, MAILING_LIST_TEXT } from '../../config'

function About(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }: About</title>
        <meta name="description" content="Lushness. Weirdness. Greenery. Grit. Cheap stock photos from Berlin, Germany, updated daily." />
      </Helmet>
      <div className="page berlin-stock-photos bsp-page bsp-about-page">
        <div className="bsp-about-page-text">
          <Header />
          <div className="main-content-section">
            <img 
              className="bsp-about-image"
              src={`${assetHostHostname()}/berlin-stock-photos/site/images/about.jpg`} alt="Berlin Stock Photos"
            />
            <p>Hot indexicality 🔥</p>
            <p className="bsp-about-page-contact-info">
              <a href="https://web.facebook.com/berlinstockphotos/">Facebook</a>
              <a href="https://www.instagram.com/berlinstockphotos/">Instagram</a>
              <a href="mailto:info@berlinstockphotos.com">info@berlinstockphotos.com</a>
            </p>
          </div>
          <div className="inline-newsletter-form main-content-section">
            <h2>Sign up for the mailing list!</h2>
            {/* <p>{ MAILING_LIST_TEXT }</p> */}
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
        <Footer />
      </div>
    </>
  )
}

export default About
