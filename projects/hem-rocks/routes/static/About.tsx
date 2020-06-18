import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'

function About(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-about">
        <h1>About HEM</h1>
        <div className="splash-image">
          <img src={`${assetHostHostname()}/hem-rocks/content/images/key-art/info-page.jpg`} alt="About HEM"/>
        </div>
      </div>
    </>
  )
}

export default About
