import React, { ReactElement, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { find } from 'lodash'
import { MainContentList, contentItemToTrack, getContentItemsFromRawList } from '../../modules/content'
import { TrackPlayPauseButton } from '../../../../lib/modules/website-player'
import { LabelTimeline } from '../../components/timeline'
import { LabelSubnav } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'

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
      <div className="page page-label page-with-subnav">
        <LabelTimeline refresh={refreshTimeline} />
        <h1>Label</h1>
        <LabelSubnav />
        <MainContentList
          currentFilter={currentFilter}
          category="label"
        >
          {(item) => {
            const attachedTracks = getContentItemsFromRawList(allContentItems, item.attachments).map(track =>
              contentItemToTrack(track)
            )

            const directFromArtist = item.externalLinkUrl && item.externalLinkText

            return (
              <>
                { attachedTracks && attachedTracks.length > 0 && (
                  <TrackPlayPauseButton track={attachedTracks[0]}/>
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
                    {
                      item.isDigitalProduct
                        // ? item.physicalFormats
                        //   ? 'Order'
                        ? 'Download'
                        : 'Info'
                    }
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
