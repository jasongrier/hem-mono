import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_PAGE_TITLE } from '../config'

function Funding(): ReactElement {
  return (
    <div className="funding-page">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Funding</title>
        <meta name="description" content="" />
      </Helmet>

      <section className="heroine heroine--normal">
        <h2>Funding</h2>
      </section>
    </div>
  )
}

export default Funding
