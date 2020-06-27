import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'
import { ContactForm } from '../../../../lib/components'
import { CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME } from '../../config'

function ReactConsulting(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-react-consulting">
        <h1>React Consulting</h1>
        <p>Guess what? All HEM projects are built in React, including this website. And we're for hire!</p>
        <h2>What we offer</h2>
        <ul>
          <li>
            <strong>New Projects</strong><br />
            New websites, microsites, widgets, and desktop apps in Electron
          </li>
          <li>
            <strong>Migrations</strong><br />
            We move your site from other architectures (eg: Angular, Ember, Vanilla Javascript
          </li>
          <li>
            <strong>Maintenance &amp; Upgrades</strong><br />
            Migrate your existing React project to latest React (eg: from class components Hooks)
          </li>
          <li>
            <strong>Donation-based Pricing</strong><br />
            Offer your customers the same pay-what-you-want pricing as you see here, and on Bandcamp
          </li>
          <li>
            <strong>Training</strong><br />
            Socially distanced expert training for management and teams
          </li>
        </ul>

        <p>** Please understand that we are looking for clients in the arts and socially conscious endeavours ONLY.</p>

        <hr/>

        <h2>Let's talk!</h2>

        <ContactForm
          action={assetHostHostname() + '/hem-rocks/api/?hem-cmd=react-inquiry'}

          subjectLabel="What would you like to talk about?"
          subjects={[
            'Choose one',
            'I have an idea for a new project',
            'I\'m interested in migrating my existing codebase to React',
            'I\'d like to upgrade my existing React project',
            'I need help with maintaining my existing React project',
            'I need help implementing donation-based pricing in my site',
            'I need training on React development for myself and my team',
          ]}
          emailLabel="Your email (so we can reach you)"
          emailPlaceholder="hrvoje.horvat@gmail.com"
          textareaLabel="Please say more"
          textareaPlaceholder="I need to build a landing page to send donations to multiple causes fighting for social justice"
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

export default ReactConsulting
