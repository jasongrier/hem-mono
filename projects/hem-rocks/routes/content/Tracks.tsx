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

function Tracks(): ReactElement {
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
          currentFilter={currentFilter}
          excludeFromAll="Sound Library"
          category="tracks"
          orderByOrder={true}
          excludeTags={['Primary Format', 'Format:Digital', 'Label Page', 'Done For Now', 'Sessions', 'Releases', 'Press', 'Sound Library']}
          linkTo={ item => hasTag(item, 'attachment') ? item.relatedContentLink : `/tracks/${item.slug}` }
          boxSecondaryTitleField="attribution"
          boxWidth={120}
          boxBlurbs={false}
          speciallyOrderedTags={['Featured', 'Rare', 'Live']}
          shouldSetCurrentPlaylist={true}
          boxMinMarginX={0}
          boxMinMarginY={0}
          boxMarginRangeX={0}
          boxMarginRangeY={80}
          boxRenderActionsOn="key-art"
        >
          {item => {
            if (hasCategory(item, 'tracks')) {
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
            }

            else if (hasCategory(item, 'playlists')) {
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
            }
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default Tracks
