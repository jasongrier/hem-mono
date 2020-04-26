import React, { ReactElement } from 'react'
import { GrandPianoHeroine } from '../components/heroines'
import { Helmet } from 'react-helmet'
import { BASE_SITE_TITLE } from '../config'

function Home(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-home">
        <div className="main-heroine">
          <GrandPianoHeroine />
        </div>
      </div>
    </>
  )
}

export default Home
