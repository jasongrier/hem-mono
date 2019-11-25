import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { DemosNav } from '../../components/content'
import { BASE_SITE_PAGE_TITLE } from '../../config'

function Demos(): ReactElement {
  return (
    <main className='page flip-book-demo'>
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Demos</title>
        <meta name="description" content="" />
      </Helmet>

      <h1>Demos</h1>
      <DemosNav />
    </main>
  )
}

export default Demos
