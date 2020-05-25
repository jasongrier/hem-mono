import React, { ReactElement, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { MainContentList } from '../modules/content'
import { TrackPlayPauseButton } from '../../../lib/modules/player'
import { LabelTimeline } from '../components/timeline'
import { BASE_SITE_TITLE } from '../config'

function Label(): ReactElement {
  const [refresh, setRefresh] = useState(0)
  const { filter: currentFilter } = useParams()

  useEffect(function updateTimeline() {
    setRefresh(refresh + 1)
  }, [currentFilter])

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-label">
        <LabelTimeline refresh={refresh} />
        <MainContentList
          blurb=""
          campaignMonitorId="5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756"
          currentFilter={currentFilter}
          filters={[
            'Record Releases',
            'Events',
            'Mixes',
            'Tracks',
            'Rarities',
            'Merch',
          ]}
          tag="label"
          title="Label"
        >
          {(item) => (
            <>
              { item.trackId && (
                <TrackPlayPauseButton track={{
                  attribution: item.attribution,
                  id: item.slug,
                  type: 'soundcloud',
                  resource: item.trackId,
                }}/>
              )}
              { !(item.externalLinkUrl && item.trackId) && (
                <Link
                  className="action-button"
                  to={`/label/${item.slug}/${currentFilter || 'all'}`}
                >
                  { item.isDigitalProduct ? 'Download' : 'Info' }
                </Link>
              )}
              { item.externalLinkUrl && item.externalLinkText && (
                <a
                  className="action-button action-button-wide"
                  href={item.externalLinkUrl}
                >
                  { item.externalLinkText }
                </a>
              )}
            </>
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default Label
