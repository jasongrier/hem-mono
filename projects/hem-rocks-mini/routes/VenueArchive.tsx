import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { noop } from 'lodash'
import { PlayPauseButton } from '../../../lib/packages/hem-buttons'
import { VenueSubnav } from '../components/layout'
import { MainContentList } from '../modules/content'
import { BASE_SITE_TITLE } from '../config'

function VenueArchive(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-venue">
        <h1>Venue Archive</h1>
        <VenueSubnav />
        <MainContentList category="venue-archive">
          {(event) => (
            <Link to={`/venue-archive/${event.slug}`}>
              <PlayPauseButton
                playing={false}
                onClick={noop}
              />
              <button className="action-button">
                Watch
              </button>
            </Link>
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default VenueArchive
