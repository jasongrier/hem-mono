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
import { getContentItemById } from '../../modules/content/functions'
import { titleCase } from 'voca'

function Tracks(): ReactElement {
  const { featuredTracksAndPlaylists, playerFeaturedTracks, playlists, label, tracks } = useSelector((state: RootState) => ({
    featuredTracksAndPlaylists: getContentItemsFromList(
      state.content.contentItems, 'featured-tracks',
    ),
    playerFeaturedTracks: flatten(
      state.content.contentItems.filter(item => hasTag(item, 'player-playlist'))
        .map(({ attachments }) => attachments)
        .map(list => getContentItemsFromRawList(state.content.contentItems, list))
    ),
    playlists: state.content.contentItems.filter(item => hasCategory(item, 'playlists') && !hasTag(item, 'player-playlist') && item.published && !isEmpty(item.attachments)),
    label: state.content.contentItems.filter(item => hasCategory(item, 'label') && (hasTag(item, 'albums') || hasTag(item, 'events')) && item.published && !isEmpty(item.attachments)),
    tracks: state.content.contentItems.filter(item => hasCategory(item, 'tracks') && item.published),
  }))

  const { filter: currentFilter }: any = useParams()

  const allItems = playlists.concat(label).concat(tracks)

  let items: IContentItem[] = []

  if (currentFilter === 'featured') {
    const featuredIndividualTrackIds = map(featuredTracksAndPlaylists.filter(item => hasCategory(item, 'tracks')), 'id')
    const featuredPlaylistTrackIds = map(playerFeaturedTracks, 'id')
      .concat(map(featuredTracksAndPlaylists.filter(item => hasCategory(item, 'playlists')), 'id'))

    items = compact(uniq(featuredIndividualTrackIds.concat(featuredPlaylistTrackIds)).map(id => getContentItemById(tracks, id)))
  }

  else if (currentFilter === 'playlists') {
    items = playlists
  }

  else {
    const tracksWithParentsIds = map(flatten(playlists.concat(label).map(parent => getContentItemsFromRawList(tracks, parent.attachments))), 'id')
    const tracksWithoutParents = tracks.filter(track => !tracksWithParentsIds.includes(track.id))
    items = playlists.concat(label).concat(tracksWithoutParents)
  }

  let fixedFilters: Array<string | undefined> = uniq(flatten(allItems.map(item => item.tags.split(',').map(tag => tag.trim())))).map(f => titleCase(f).replace(/-/g, ' '))
  fixedFilters = fixedFilters.filter(f =>
    f && !['Primary Format', 'Format:Digital', 'Label Page'].includes(f)
  )

  const speciallyOrderedTags = ['Featured', 'Playlists', 'Rare', 'Live', 'Releases']

  for (const soTag of speciallyOrderedTags) {
    const soIndex = fixedFilters.findIndex(f => f === soTag)
    if (soIndex > -1) {
      fixedFilters[soIndex] = undefined
    }
  }

  fixedFilters = speciallyOrderedTags.concat(compact(fixedFilters))

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks page-with-subnav">
        <TracksSubnav />
        <MainContentList
          currentFilter={currentFilter}
          excludeFromAll="Sound Library"
          category="tracks"
          fixedFilters={fixedFilters}
          additionalFilters={['Playlists']}
          items={items}
          linkTo={ item => hasTag(item, 'attachment') ? item.relatedContentLink : `tracks/${item.slug}` }
          boxSecondaryTitleField="attribution"
          boxWidth={120}
          boxBlurbs={false}
        >
          {item => {
            const track = contentItemToTrack(item)

            return (
              <>
                <TrackPlayPauseButton track={track} />
                { hasTag(item, 'attachment') && (
                  <Link
                    className="action-button"
                    to={item.relatedContentLink}
                  >
                    Learn more
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

export default Tracks
