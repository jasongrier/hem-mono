import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { assetHostHostname } from '../functions'
import { BASE_SITE_TITLE } from '../config'

function Info(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-info">
        <h1>Info</h1>
        <div className="splash-image">
          <img src={`${assetHostHostname()}/hem-rocks/content/images/key-art/info-page.jpg`} alt="About HEM"/>
        </div>
      </div>
    </>
  )
}

export default Info
