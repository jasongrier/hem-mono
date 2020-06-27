import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { CampaignMonitorForm } from '../../../../lib/components'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME } from '../../config'

function About(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-about">
        <h1>About HEM</h1>
        <div className="splash-image">
          <img src={`${assetHostHostname()}/hem-rocks/content/images/key-art/info-page.jpg`} alt="About HEM"/>
        </div>

        <h2>Demo Policy</h2>
        <p>By "demo" we mean: Sound, text, visual art, new media, code, apps, proposals, websites, events, actions, anything you've got going on.</p>
        <p>We're happy to experience your work and offer you feedback, mentorship, and advice!</p>
        <p>Please note that it is more about that than producing and releasing stuff, in the traditional sense.</p>
        <p>Please do send us a link to your work via the <Link to="contact">contact form</Link>.</p>

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
    </>
  )
}

export default About
