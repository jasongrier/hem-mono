import React, { ReactElement, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { find } from 'lodash'
import { MainContentList, contentItemToTrack } from '../modules/content'
import { TrackPlayPauseButton } from '../../../lib/modules/player'
import { LabelTimeline } from '../components/timeline'
import { BASE_SITE_TITLE } from '../config'
import { RootState } from '../index'

function Label(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const [refreshTimeline, setRefreshTimeline] = useState(0)

  const { filter: currentFilter } = useParams()

  useEffect(function updateTimeline() {
    setRefreshTimeline(refreshTimeline + 1)
  }, [currentFilter])

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-label">
        <LabelTimeline refresh={refreshTimeline} />
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
          {(item) => {
            const trackItem = find(allContentItems, { slug: item.trackSlug })
            const track = trackItem && contentItemToTrack(trackItem, `tracks/${item.slug}`)
            const directFromArtist = item.externalLinkUrl && item.externalLinkText

            return (
              <>
                { track && (
                  <TrackPlayPauseButton track={track}/>
                )}
                { directFromArtist && (
                  <a
                    className="action-button action-button-wide"
                    href={item.externalLinkUrl}
                  >
                    { item.externalLinkText }
                  </a>
                )}
                { !directFromArtist && (
                  <Link
                    className="action-button"
                    to={`/label/${item.slug}/${currentFilter || 'all'}`}
                  >
                    { item.isDigitalProduct ? 'Download' : 'Info' }
                  </Link>
                )}
              </>
            )
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default Label
