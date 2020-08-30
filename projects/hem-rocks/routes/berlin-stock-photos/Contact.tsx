import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'
import { Header, Footer } from '../../components/berlin-stock-photos'
import { ContactForm } from '../../../../lib/components'

function Contact(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page berlin-stock-photos bsp-page">
        <Header />
        <h1>Contact us</h1>
        <div className="first-main-content-section">
          <ContactForm
            action={assetHostHostname() + '/hem-rocks/api/?hem-cmd=contact-form&site=bsp'}

            subjectLabel="Subject"
            subjectPlaceholder="Greetz from Hrvoje"
            emailLabel="Your email (so we can reach you)"
            emailPlaceholder="hrvoje.horvat@gmail.com"
            textareaLabel="Please say more"
            textareaPlaceholder="Sehr geehrte Damen und Herren..."
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
                <p>Please send an e-mail to: <a href="mailto:support@berlinstockphotos.com">support@berlinstockphotos.com</a></p>
                <p className="contact-form-home-link">&larr; <Link to="/">Home</Link></p>
              </>
            )}
          />
        </div>
      </div>
      
      <Footer />
    </>
  )
}

export default Contact
