import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_TITLE } from '../../config'
import { TracksSubnav } from '../../components/layout'

function TracksOverview(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks-overview">
        <TracksSubnav />
        <div className="overview-page">
          <div className="overview-page-row">
            <h2>Tracks</h2>
          </div>
          <div className="overview-page-row">
            <h2>Playlists</h2>
          </div>
          <div className="overview-page-row">
            <h2>Mixes</h2>
          </div>
          <div className="overview-page-row">
            <h2>Rare</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default TracksOverview
