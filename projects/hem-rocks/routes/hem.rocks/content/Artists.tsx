import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { map, flatten, isEmpty, uniq, compact, findIndex } from 'lodash'
import { MainContentList, contentItemToTrack, hasCategory, hasTag, getContentItemsFromRawList, getContentItemsFromList, IContentItem } from '../../../modules/core/content'
import { TrackPlayPauseButton } from '../../../../../lib/modules/website-player'
import { TracksSubnav, MainContentBanner } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'
import { RootState } from '../../../index'

function Artists(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks page-with-subnav">
        <MainContentBanner
          headline="Tracks by<br>Artist"
        />
        <TracksSubnav />
        <MainContentList
          hasFilters={false}
          category="artists"
          boxWidth={120}
          boxBlurbs={false}
          shouldSetCurrentPlaylist={true}
          currentFilter="all"
          boxMinMarginX={0}
          boxMinMarginY={0}
          boxMarginRangeX={0}
          boxMarginRangeY={80}
          boxRenderActionsOn="key-art"
          orderByTitle={true}
        >
          {item => {
            const attachedTracks = getContentItemsFromRawList(allContentItems, item.attachments).map(track =>
              contentItemToTrack(track)
            )

            if (!attachedTracks || !attachedTracks.length) return <div />

            return (
              <TrackPlayPauseButton
                activeFor={attachedTracks}
                track={attachedTracks[0]}
              />
            )
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default Artists
