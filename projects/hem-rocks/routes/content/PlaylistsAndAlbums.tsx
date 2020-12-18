import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { map, flatten, isEmpty, uniq, compact, findIndex } from 'lodash'
import { MainContentList, contentItemToTrack, hasCategory, hasTag, getContentItemsFromRawList, getContentItemsFromList, IContentItem } from '../../modules/content'
import { TrackPlayPauseButton } from '../../../../lib/modules/website-player'
import { TracksSubnav } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'

function PlaylistsAndAlbums(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks page-with-subnav">
        <TracksSubnav />
        <MainContentList
          currentFilter={currentFilter || 'all'}
          excludeFromAll="Player Playlist"
          category="playlists"
          additionalCategory="label"
          orderByOrder={true}
          excludeTags={['Primary Format', 'Format:Digital', 'Label Page', 'Done For Now', 'Sessions', 'Releases', 'Press', 'Sound Library', 'Player Playlist']}
          linkTo={ item => hasTag(item, 'attachment') ? item.relatedContentLink : `/tracks/${item.slug}` }
          boxSecondaryTitleField="attribution"
          boxWidth={120}
          boxBlurbs={false}
          noAll={false}
          shouldSetCurrentPlaylist={true}
          hideIfNoAttachments={true}
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

export default PlaylistsAndAlbums
