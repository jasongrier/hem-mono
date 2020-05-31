import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { noop } from 'lodash'
import { PlayPauseButton } from '../../../lib/packages/hem-buttons'
import { VenueSubnav } from '../components/layout'
import { MainContentList } from '../modules/content'
import { BASE_SITE_TITLE } from '../config'
import { RootState } from '../index'

function Venue(): ReactElement {
  const { activeLiveStream } = useSelector((state: RootState) => ({
    activeLiveStream: state.app.activeLiveStream,
  }))

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-venue">
        <h1>Venue</h1>
        <VenueSubnav />
        <MainContentList
          linkTo={(event) => event.slug === activeLiveStream ? '/venue/main-stage' : `/venue-calendar/${event.slug}`}
          category="venue-calendar"
        >
          {(event) => {
            if (event.slug === activeLiveStream) {
              return (
                <Link to="/venue/main-stage">
                  <PlayPauseButton
                    playing={false}
                    onClick={noop}
                  />
                  <button className="action-button">
                    Watch
                  </button>
                </Link>
              )
            }

            else {
              return (
                <Link
                  className="action-button"
                  to={`/venue-calendar/${event.slug}`}
                >
                  Info
                </Link>
              )
            }
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default Venue
