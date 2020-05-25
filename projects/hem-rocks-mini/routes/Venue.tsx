import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { noop } from 'lodash'
import { PlayPauseButton } from '../../../lib/packages/hem-buttons'
import { VenueSubnav } from '../components/layout'
import { MainContentList } from '../modules/content'
import { BASE_SITE_TITLE } from '../config'

declare const Twitch: any

function Venue(): ReactElement {
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
          buttonText="Download"
          campaignMonitorId="5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756"
          currentFilter={currentFilter}
          filters={[]}
          exclusiveFilters={[]}
          highlights={[]}
          infoPopupTitle=""
          tag="venue-calendar"
          title=""
        >
          {() => (
            <PlayPauseButton
              playing={false}
              onClick={noop}
            />
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default Venue
