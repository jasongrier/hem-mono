import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_TITLE } from '../../config'

function NotFound(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-not-found">
        <h1>Uh oh...</h1>
        <p>We couldn't find what you're looking for.</p>
      </div>
    </>
  )
}

export default NotFound
