import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { CampaignMonitorForm } from '../../../../lib/components'
import { AboutSubnav } from '../../components/layout'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME } from '../../config'

function About(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-about page-with-subnav">
        <h1>About HEM</h1>
        <AboutSubnav />
        <div className="main-content-section first-main-content-section">
          <h2>HEM is a sound art and software company.</h2>
          <p>We make <Link to="sound-library">Sound Library</Link>, <Link to="apps/seurat">Seurat</Link>, <Link to="apps/midst">Midst</Link>, and <Link to="apps/breto">Breto</Link>.</p>

          <p className="splash-image">
            <img src={`${assetHostHostname()}/hem-rocks/content/images/key-art/info-page.jpg`} alt="About HEM" />
          </p>
        </div>

        <div className="main-content-section">
          <h2>Label</h2>
          <p>HEM started as a music label called Human Ear Music. It was at first run collectively in Los Angeles in 2006. You may have heard of a few of Human Ear Music's founding members and participants: Ariel Pink, Michael Pisaro, Geneva Jacuzzi, Julia Holter, and Jason Grier.</p>
          <p>The entire history of Human Ear Music is hosted <Link to="label">here</Link>, including tons of rare tracks that cannot be heard elsewhere.</p>
        </div>

        <div className="main-content-section">
          <h2>Demo Policy</h2>
          <p>By "demo" we mean: Sound, text, visual art, new media, code, apps, proposals, websites, events, actions, anything you've got going on.</p>
          <p>We're happy to experience your work and offer you feedback, mentorship, and advice!</p>
          <p>Please note that it is more about that than producing and releasing stuff, in the traditional sense.</p>
          <p>Please do send us a link to your work via the <Link to="contact">contact form</Link>.</p>
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
