import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_PAGE_TITLE } from '../../config'

function ArrangerDemo(): ReactElement {
  return (
    <main className="page arranger-demo">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Arranger Demo</title>
        <meta name="description" content="" />
      </Helmet>

      <h1>Arranger Demo</h1>
      {/* TODO: Describe the arranger */}
      <p></p>
    </main>
  )
}

export default ArrangerDemo
