import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { assetHostHostname } from '../../functions'
import { ContactForm } from '../../../../lib/components'
import { Header } from '../../components/berlin-stock-photos'
import { BASE_SITE_TITLE, BERLIN_STOCK_PHOTOS } from '../../config'

function Support(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page berlin-stock-photos bsp-page">
        <Header />
        <h1>Need help?</h1>
        <div className="first-main-content-section">
          <ContactForm
            action={assetHostHostname() + '/hem-rocks/api/?hem-cmd=support-claim&site=bsp'}
            subjects={[
              'Choose one',
              'Problems downloading',
              'Website bugs or suggestions',
              'Something else',
            ]}

            subjectLabel="What seems to be the problem? (choose one)"
            emailLabel="Your email (so we can reach you)"
            emailPlaceholder="hrvoje.horvat@gmail.com"
            textareaLabel="Please say more"
            textareaPlaceholder="Why can't I download my files a second time?!"
            buttonText="Send"
            spinnerText="Sending..."
            successContent={id => (
              <>
                <h1>Got it</h1>
                <p>Someone will be contacting you soon about your question.</p>
                <p>Your case id is:</p>
                <p><strong>{ id }</strong></p>
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
    </>
  )
}

export default Support
