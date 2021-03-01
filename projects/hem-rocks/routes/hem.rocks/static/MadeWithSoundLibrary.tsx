import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ContactForm } from '../../../../lib/components'
import { SoundLibrarySubnav, MainContentBanner } from '../../components/layout'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'

function MadeWithSoundLibrary(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-made-with-sl">
        <SoundLibrarySubnav />
        <div className="main-content-section first-main-content-section">
          <h2>Have you used SL or SL2 in a project?</h2>
          <p>
            Send a link! If you like, we would love to feature your work here on hem.rocks.
          </p>
        </div>

        <ContactForm
          action={assetHostHostname() + '/hem-rocks/api/?hem-cmd=made-with-sl'}
          bodyAsInput={true}
          prefilledSubject="New Made with SL message"
          emailLabel="Your email (so we can reach you)"
          emailPlaceholder="hrvoje.horvat@gmail.com"
          bodyLabel="Link to your work online (Bandcamp, SoundCloud, your website, etc.)"
          bodyPlaceholder="http://www..."
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
    </>
  )
}

export default MadeWithSoundLibrary
