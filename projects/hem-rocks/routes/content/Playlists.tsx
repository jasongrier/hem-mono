import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { map, flatten, isEmpty, uniq, compact, findIndex } from 'lodash'
import { MainContentList, contentItemToTrack, hasCategory, hasTag, getContentItemsFromRawList, getContentItemsFromList, IContentItem } from '../../modules/core/content'
import { TrackPlayPauseButton, replacePlaylist, setPlayerPlaylist } from '../../../../lib/modules/website-player'
import { TracksSubnav, MainContentBanner } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'

function Playlists(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks page-with-subnav">
        <MainContentBanner>Playlists</MainContentBanner>
        <TracksSubnav />
        <MainContentList
          currentFilter={currentFilter || 'featured'}
          excludeFromAll="Player Playlist"
          category="playlists"
          orderByOrder={true}
          excludeTags={['Primary Format', 'Format:Digital', 'Label Page', 'Done For Now', 'Player Playlist', 'Has Multiple Artists', 'In Overview Playlists']}
          boxSecondaryTitleField="attribution"
          boxWidth={120}
          boxBlurbs={false}
          hideIfNoAttachments={true}
          speciallyOrderedTags={['Featured', 'New', 'Rare', 'Live']}
          boxMinMarginX={0}
          boxMinMarginY={0}
          boxMarginRangeX={0}
          boxMarginRangeY={80}
          boxRenderActionsOn="key-art"
        >
          {item => {
            const attachedTracks = getContentItemsFromRawList(allContentItems, item.attachments).map(track =>
              contentItemToTrack(track)
            )

            if (!attachedTracks || !attachedTracks.length) return <div />

            return (
              <div onClick={() => {
                dispatch(replacePlaylist(6, { name: 'Selected Playlist', tracks: attachedTracks }))
                dispatch(setPlayerPlaylist(6))
              }}>
                <TrackPlayPauseButton
                  activeFor={attachedTracks}
                  track={attachedTracks[0]}
                />
              </div>
            )
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default Playlists
