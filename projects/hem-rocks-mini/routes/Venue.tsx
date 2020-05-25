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

  const currentFilter = 'all'

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
          blurb=""
          campaignMonitorId="5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756"
          currentFilter={currentFilter}
          filters={[]}
          exclusiveFilters={[]}
          highlights={[]}
          infoPopupTitle=""
          linkTo={(event) => event.slug === activeLiveStream ? '/venue/main-stage' : `/venue-calendar/${event.slug}`}
          tag="venue-calendar"
          title=""
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
