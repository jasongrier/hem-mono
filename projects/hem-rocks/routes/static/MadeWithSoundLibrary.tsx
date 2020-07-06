import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { ContactForm } from '../../../../lib/components'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME } from '../../config'

function MadeWithSoundLibrary(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-made-with-sl">
        <h1>Made with SL</h1>
        <div className="main-content-section">
          <h2>Have you used SL in a project?</h2>
          <p>Send your project info here, along with a link where we can hear it.</p>
          <p>If you like, we would love to feature your work here on hem.rocks!</p>
          <p>Your project will appear on hem.rocks, on social media, and in the monthly newsletter.</p>
        </div>

        <ContactForm
          action={assetHostHostname() + '/hem-rocks/api/?hem-cmd=made-with-sl'}

          subjectLabel="Choose one"
          subjects={[
            'I would like to have my track featured on hem.rocks, social media, and newsletter',
            'I would simply like you to know I did this and what you think',
          ]}
          emailLabel="Your email (so we can reach you)"
          emailPlaceholder="hrvoje.horvat@gmail.com"
          textareaLabel="Please say more"
          textareaPlaceholder="I used the Noise Reduction Artefacts pack at 4'33'' in my track! Here's the secret link: https://soundclou..."
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
