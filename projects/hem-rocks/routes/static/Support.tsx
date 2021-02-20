import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { assetHostHostname } from '../../functions'
import { ContactForm } from '../../../../lib/components'
import { AboutSubnav } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'

function Support(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-support">
        <AboutSubnav />
        <h1>Need help?</h1>
        <div className="first-main-content-section">
          <ContactForm
            action={assetHostHostname() + '/hem-rocks/api/?hem-cmd=support-claim'}
            subjects={[
              'Choose one',
              'Problems downloading',
              'Trouble using sound packs',
              'Physical order not received or defective',
              'Website bugs or suggestions',
              'Something else',
            ]}
            subjectLabel="What seems to be the problem? (choose one)"
            emailLabel="Your email (so we can reach you)"
            emailPlaceholder="hrvoje.horvat@gmail.com"
            bodyLabel="Please say more"
            bodyPlaceholder="Why can't I download my files a second time?!"
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
                <p>Please send an e-mail to: <a href="mailto:support@hem.rocks">support@hem.rocks</a></p>
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
