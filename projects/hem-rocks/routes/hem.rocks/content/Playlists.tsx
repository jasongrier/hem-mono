import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { map, flatten, find, uniq, compact, findIndex } from 'lodash'
import { MainContentList, contentItemToTrack, hasCategory, hasTag, getContentItemsFromRawList, getContentItemsFromList, IContentItem } from '../../../modules/core/content'
import { TrackPlayPauseButton, replacePlaylist, addPlaylist, setPlayerPlaylist } from '../../../../../lib/modules/website-player'
import { TracksSubnav, MainContentBanner, TracksBoxChild } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'
import { RootState } from '../../../index'

function Playlists(): ReactElement {
  const { allTracksItems } = useSelector((state: RootState) => ({
    allTracksItems: state.content.contentItems.filter(i => hasCategory(i, 'tracks')),
  }))

  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks page-with-subnav">
        <MainContentBanner headline="Playlists" />
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
        >
          {item => (
            <TracksBoxChild
              allTracksItems={allTracksItems}
              item={item}
            />
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default Playlists
