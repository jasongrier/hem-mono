import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { MailingListFormMirror } from '../ui'
import { WebsitePlayerControls } from '../../packages/website-player'

function Footer(): ReactElement {
  return (
    <>
      <footer className="site-footer clearfix">
        <div className="site-footer-content">
          <h1>HEM</h1>
          <div className="site-footer-content-column">

          </div>
          <div className="site-footer-content-column">
            <h2>Sign up for our newsletter</h2>
            <MailingListFormMirror
              hasNameField={false}
              id=""
              labelForEmail=""
              labelForName=""
              placeholderText="Get updates in your inbox 🚀"
              submitButtonText="Sign up"
            />
          </div>
          <div className="site-footer-the-end">
            <div className="site-footer-final-nav">
              <nav>
                <ul>
                  <li>
                    <Link to="/">Contact</Link>
                  </li>
                  <li>
                    <Link to="/">Press Resources</Link>
                  </li>
                  <li>
                    <Link to="/">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/">Impressum</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="site-footer-copyright">
              &copy; 2020 HEM International Inc.
              <div className="site-footer-copyright-logo">HEM</div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-player-controls">
        <WebsitePlayerControls expanded={true} />
      </div>
    </>
  )
}

export default Footer
