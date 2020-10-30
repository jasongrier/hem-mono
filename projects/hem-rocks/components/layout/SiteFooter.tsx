import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { CampaignMonitorForm } from '../../../../lib/components'
import ReactGA from 'react-ga'
import { MAILING_LIST_TEXT, CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, CAMPAIGN_MONITOR_FORM_ID, BERLIN_STOCK_PHOTOS } from '../../config'

function SiteFooter(): ReactElement {
  return (
    <div className="site-footer">
      <div className="site-footer-content">
        <h1>HEM</h1>
        <div className="site-footer-content-row">
          <div className="site-footer-content-column">
            <ul>
              <li><Link to="/label">Label</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/support">Support</Link></li>
              <li><Link to="/internships">Internships</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
          <div className="site-footer-content-column">
            <ul>
              <li><a href="">Video</a></li>
              <li><a href="">Press Releases</a></li>
              <li><a href="">Press Clippings</a></li>
              <li><a href="">Demo Policy</a></li>
            </ul>
          </div>
          <div className="site-footer-content-column">
            <ul>
              <li><a href="">YouTube</a></li>
              <li><a href="">Github</a></li>
              <li><a href="">Mastodon</a></li>
              <li><a href="">Patreon</a></li>
            </ul>
          </div>
          <div className="site-footer-content-column site-footer-content-column-wide">
            <h2>Sign up to our newsletter</h2>
            <p>{ MAILING_LIST_TEXT }</p>
            <CampaignMonitorForm
              action={CAMPAIGN_MONITOR_FORM_ACTION}
              emailFieldName={CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME}
              hasNameField={false}
              id={CAMPAIGN_MONITOR_FORM_ID}
              onFormSubmitted={() => {
                ReactGA.event({
                  category: 'User',
                  action: 'Joined the mailing list from the mega nav.',
                })
              }}
              submitButtonText="Join"
            />
          </div>
        </div>
        <div className="site-footer-content-row site-footer-content-fine-print">
          <a href="">Privacy Policy</a>
          <a href="">Cookie Policy</a>
          <Link to="/cookie-policy">Privacy Settings</Link>
          <Link to="/react-consulting">React Consulting</Link>
          <Link to="/internal">Internal Pages</Link>
          <br />
          &copy; 2020, Hot Extramusicality, Inc.
        </div>
      </div>
    </div>
  )
}

export default SiteFooter
