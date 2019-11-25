import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_PAGE_TITLE } from '../config'

function NotFound(): ReactElement {
  return (
    <main className="page not-found">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Not Found</title>
        <meta name="description" content="" />
      </Helmet>
      <h1>Sorry</h1>
      <p>We could not find what you are looking for</p>
    </main>
  )
}

export default NotFound
