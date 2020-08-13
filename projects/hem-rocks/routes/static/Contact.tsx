import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'
import { AboutSubnav } from '../../components/layout'
import { ContactForm } from '../../../../lib/components'

function Contact(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-contact">
        <h1>Contact us</h1>
        <AboutSubnav />
        <div className="first-main-content-section">
          <ContactForm
            action={assetHostHostname() + '/hem-rocks/api/?hem-cmd=contact-form'}

            subjectLabel="Subject"
            subjectPlaceholder="Greetz from Hrvoje"
            emailLabel="Your email (so we can reach you)"
            emailPlaceholder="hrvoje.horvat@gmail.com"
            textareaLabel="Please say more"
            textareaPlaceholder="Hey do you guys accept demos?"
            buttonText="Send"
            spinnerText="Sending..."
            successContent={id => (
              <>
                <h1>Talk soon!</h1>
                <p>We'll get back to you soon.</p>
                <p className="contact-form-home-link">&larr; <Link to="/">Home</Link></p>
              </>
            )}
            errorContent={() => (
              <>
                <h1>Uh oh</h1>
                <p>For some reason, your message could not be sent.</p>
                <p>Please send an e-mail to: <a href="mailto:support@hem.rocks">support@hem.rocks</a></p>
                <p className="contact-form-home-link">&larr; <Link to="/">Home</Link></p>
              </>
            )}
          />
        </div>
        <div className="main-content-deva deva-clever-knight" />
      </div>
    </>
  )
}

export default Contact
