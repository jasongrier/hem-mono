import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { assetHostHostname } from '../../../../hem-rocks/functions'
import { SiteText } from '../../../modules/core/content'
import { ContactForm } from '../../../../../lib/components'
import { BASE_SITE_TITLE } from '../../../config'

function ReactJavascriptConsulting(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page about-sl2 page-web-biz-landing-page">
        <div className="main-content-section first-main-content-section" style={{ color: 'black' }}>
        </div>
      </div>
    </>

    // <div className="page page-react-javascript-consulting">
    //   <h1>React Javascript Consulting</h1>

    //   <p>I specialise in devising strategies and practical implementations for you to migrate legacy systems to React in a smooth and nontoxic way. I love solving "the hard problems" elegantly and beautifully.</p>

    //   <p className="page-react-consulting-framework-logos">[Django Logo to React Logo] [AngularJS Logo to React Logo]</p>

    //   <p className="page-react-consulting-framework-logos">[Rails Logo to React Logo] [AngularJS Logo to React Logo] [Ember Logo to React Logo] [Vanilla JS  to React Logo]</p>

    //   <h2>TL;DR? Just get in touch:</h2>

      // <ContactForm
      //   action={assetHostHostname() + '/hem-rocks/api/?hem-cmd=contact-form&site=bsp'}
      //   subjectLabel="Subject"
      //   subjectPlaceholder="Greetz from Hrvoje"
      //   emailLabel="Your email (so we can reach you)"
      //   emailPlaceholder="hrvoje.horvat@gmail.com"
      //   bodyLabel="Please say more"
      //   bodyPlaceholder="Sehr geehrte Damen und Herren..."
      //   buttonText="Send"
      //   spinnerText="Sending..."
      //   successContent={id => (
      //     <>
      //       <h1>Talk soon!</h1>
      //       <p>We'll get back to you soon.</p>
      //       <p className="contact-form-home-link">&larr; <Link to="/">Home</Link></p>
      //     </>
      //   )}
      //   errorContent={() => (
      //     <>
      //       <h1>Uh oh</h1>
      //       <p>For some reason, your message could not be sent.</p>
      //       <p>Please send an e-mail to: <a href="mailto:support@berlinstockphotos.com">support@berlinstockphotos.com</a></p>
      //       <p className="contact-form-home-link">&larr; <Link to="/">Home</Link></p>
      //     </>
      //   )}
      // />

    //   <h2>More about what I offer</h2>

    //   <p>I engage with your team members to develop framework components, tooling architecture, and testing strategies. But moreover, I offer intensive mentoring and training. Not just a technical chore, but a level-up for your whole team.</p>

    //   <p>I have extensive experience in digital asset management, new media arts, and financial technology; and in major markets in the US, Germany, and the Nordics.</p>

    //   <p>Click [here](#rates) for rates.</p>

    //   <p>In addition to React migrations, I also offer general Javascript consulting, mentoring, and lessons a-la-carte:</p>

    //   <ul>
    //     <li>Ethical analytics with matomo</li>
    //     <li>Metaprogramming, parsing, and lexical scope</li>
    //     <li>Advanced functional programming concepts</li>
    //     <li>Using JSON-LD and GraphQL in Node</li>
    //     <li>Python for Javascripters</li>
    //     <li>Writing your own programming language</li>
    //     <li>Writing your own Javascript framework</li>
    //     <li>Or anything interesting and challenging that you can think of!</li>
    //   </ul>

    //   <h2>Interested in Vue instead?</h2>

    //   <p>I also do Vue!</p>

    //   <h2>Recent React migrations:</h2>

    //   <p className="page-react-consulting-corporate-logos">[MGM] [Lionsgate] [Amazon Studios] [mediapeers] [Billy] [Moneyflow]</p>

    //   <h2>Case Study #1: Going from Angular 1 to React with Amazon Studios</h2>

    //   <h2>Case Study #2: Going from Ember to React with Billy</h2>

    //   <h2>Case Study #3: Going from Django to Vue with Moneyflow</h2>

    //   <p>
    //     <strong>Company profile: Fastest-growing FinTech startup in Copenhagen, over xxx growth in 2020, xxx developers, Stack: Dramatiq/Python/Django/Vanilla JS</strong>
    //   </p>

    //   <h2 id="rates">My Rates</h2>

    //   <p>I charge a flat rate:</p>

    //   <p>Migration to React or Vue: 12 000 USD per month</p>

    //   <p>A-la-carte consultation: 500 USD per day</p>
    // </div>
  )
}

export default ReactJavascriptConsulting
