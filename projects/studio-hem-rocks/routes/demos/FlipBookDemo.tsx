import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_PAGE_TITLE } from '../../config'

function FlipBookDemo(): ReactElement {
  return (
    <main className="page flip-book-demo">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Flip Book Demo</title>
        <meta name="description" content="" />
      </Helmet>

      <h1>Flip Book Demo</h1>
    </main>
  )
}

export default FlipBookDemo
