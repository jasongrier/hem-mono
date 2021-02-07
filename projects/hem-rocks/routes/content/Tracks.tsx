import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MainContentList, hasTag } from '../../modules/content'
import { TracksSubnav, TracksBoxChild } from '../../components/layout'
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
          excludeTags={['Primary Format', 'Format:Digital', 'Label Page', 'Done For Now', 'Sessions', 'Releases', 'Press', 'Sound Library', 'Not Playable', 'In Overview Tracks', 'In Overview Rare']}
          linkTo={ item => hasTag(item, 'attachment') ? item.relatedContentLink : `/tracks/${item.slug}` }
          boxSecondaryTitleField="attribution"
          boxWidth={120}
          boxBlurbs={false}
          speciallyOrderedTags={['Featured', 'New', 'Rare', 'Live']}
          shouldSetCurrentPlaylist={true}
          boxMinMarginX={0}
          boxMinMarginY={0}
          boxMarginRangeX={0}
          boxMarginRangeY={80}
          boxRenderActionsOn="key-art"
          randomizeTags={['featured']}
          limitTags={['featured']}
        >
          {item => (
            <TracksBoxChild
              allContentItems={allContentItems}
              item={item}
            />
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default Tracks
