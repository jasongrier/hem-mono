import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_PAGE_TITLE } from '../../../config'

function OrionOrion(): ReactElement {
  return (
    <main className='page orion-orion'>
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Orion (Track)</title>
        <meta name="description" content="" />
      </Helmet>

      <h1>Orion</h1>

    </main>
  )
}

export default OrionOrion
