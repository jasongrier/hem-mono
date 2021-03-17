import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MainContentList, hasTag, hasCategory } from '../../../modules/core/content'
import { TracksSubnav, TracksBoxChild, MainContentBanner } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'
import { RootState } from '../../../index'

function Tracks(): ReactElement {
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
        <MainContentBanner
          headline="Tracks"
        />
        <TracksSubnav />
        <MainContentList
          currentFilter={currentFilter || 'featured'}
          excludeFromAll="Sound Library"
          category="tracks"
          orderByOrder={true}
          excludeTags={['Primary Format', 'Format:Digital', 'Label Page', 'Done For Now', 'Sessions', 'Releases', 'Press', 'Sound Library', 'Not Playable', 'In Overview Tracks', 'In Overview Rare', 'Home Features']}
          linkTo={ item => hasTag(item, 'attachment') ? item.relatedContentLink : `/tracks/detail/${item.slug}` }
          boxSecondaryTitleField="attribution"
          boxWidth={120}
          boxBlurbs={false}
          speciallyOrderedTags={['Featured', 'New', 'Rare', 'Live']}
          shouldSetCurrentPlaylist={true}
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

export default Tracks
