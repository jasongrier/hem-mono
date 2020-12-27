import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TrackPlayPauseButton } from '../../../../lib/modules/website-player'
import { MainContentList, getContentItemsFromRawList, contentItemToTrack } from '../../modules/content'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'
import { getContentItemById } from '../../modules/content/functions'
import { isEmpty } from 'lodash'

function PressReleases(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const { filter: currentFilter } = useParams() as any

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-press-releases">
        <MainContentList
          currentFilter={currentFilter || 'all'}
          noAll={false}
          category="press-releases"
          title="Press Releases"
          orderByOrder={true}
        >
          {(item) => {
            const attachedPlaylist = getContentItemById(allContentItems, item.attachments)

            if (!attachedPlaylist) return
            if (isEmpty(attachedPlaylist)) return

            const attachedTracks = getContentItemsFromRawList(allContentItems, attachedPlaylist.attachments).map(track =>
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

export default PressReleases
