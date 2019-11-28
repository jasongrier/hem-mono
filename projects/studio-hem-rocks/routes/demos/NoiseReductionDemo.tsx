import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_PAGE_TITLE } from '../../config'

function NoiseReductionDemo(): ReactElement {
  return (
    <main className="page noise-reduction-demo">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Noise Reduction Demo</title>
        <meta name="description" content="" />
      </Helmet>
    </main>
  )
}

export default NoiseReductionDemo
