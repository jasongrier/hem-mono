import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { map, flatten, find, uniq, compact, findIndex } from 'lodash'
import { MainContentList, contentItemToTrack, hasCategory, hasTag, getContentItemsFromRawList, getContentItemsFromList, IContentItem } from '../../../modules/core/content'
import { TrackPlayPauseButton, replacePlaylist, addPlaylist, setPlayerPlaylist } from '../../../../../lib/modules/website-player'
import { TracksSubnav, MainContentBanner } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'
import { RootState } from '../../../index'

function Playlists(): ReactElement {
  const { allContentItems, playlists } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    playlists: state.player.playlists,
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
        <MainContentBanner
          headline="Playlists"
        />
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
                const selectedPlaylistIndex = findIndex(playlists, { name: 'Selected Playlist' })
                dispatch(replacePlaylist(selectedPlaylistIndex, { name: 'Selected Playlist', tracks: attachedTracks }))
                dispatch(setPlayerPlaylist(selectedPlaylistIndex))
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
