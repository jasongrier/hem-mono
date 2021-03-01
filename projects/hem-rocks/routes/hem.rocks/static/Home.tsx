import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { map } from 'lodash'
import { ITrack, TrackPlayPauseButton } from '../../../../../lib/modules/website-player'
import { HemRefreshHeroine } from '../../../components/heroines'
import { MainContentList, getContentItemsFromRawList, contentItemToTrack, hasCategory, getContentItemBySlug, hasTag, hasProperty } from '../../../modules/core/content'
import { BASE_SITE_TITLE } from '../../../config'
import { RootState } from '../../../index'

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
          <HemRefreshHeroine contentItem={getContentItemBySlug(contentItems, 'home-heroine-january-2021')} />
        </div>
        <MainContentList
          category="home-features"
          applyCurrentFilter={false}
          items={contentItems.filter(i => hasProperty(i, 'home-features'))}
          playlistToSet={0}
          boxSecondaryTitleField="attribution"
          showCategoryOnContentBoxes={true}
          noFilters={true}
          linkTo={contentItem => `home/${contentItem.slug}`}
          orderByOrder={true}
          ignoreSticky={true}
          boxBipolarY={true}
          boxWidth={200}
          boxMinMarginX={0}
          boxMarginRangeX={0}
          boxMarginRangeY={75}
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
