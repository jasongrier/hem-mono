import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { ITrack, TrackPlayPauseButton } from '../../../../lib/modules/website-player'
import { SoundLibraryRefreshHeroine, HemRefreshHeroine, GrandPianoHeroine } from '../../components/heroines'
import { MainContentList, getContentItemsFromRawList, contentItemToTrack, hasCategory } from '../../modules/content'
import { ReleasePhase } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'

function Home(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-home">
        <div className="main-heroine">
          <ReleasePhase exact phase={1}>
            <HemRefreshHeroine />
          </ReleasePhase>
          <ReleasePhase phase={2}>
            <GrandPianoHeroine />
          </ReleasePhase>
        </div>
        <MainContentList
          category="home-features"
          playlistToSet={0}
          showCategoryOnContentBoxes={true}
          noFilters={true}
          linkTo={(contentItem) => `home/${contentItem.slug}`}
          orderByOrder={true}
          ignoreSticky={true}
          >
          {(item) => {
            let attachedTracks: ITrack[]

            if (hasCategory(item, 'tracks')) {
              attachedTracks = [contentItemToTrack(item)]
            }

            else {
              attachedTracks = getContentItemsFromRawList(contentItems, item.attachments)
                .map(track =>
                  contentItemToTrack(track)
                )
            }

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

export default Home
