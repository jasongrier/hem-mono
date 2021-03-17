import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { findIndex } from 'lodash'
import { HemRefreshHeroine } from '../../../components/heroines'
import { PlayableBoxActions } from '../../../components/layout'
import { MainContentList, getContentItemById, getContentItemsFromList, contentItemToTrack, hasCategory, getContentItemBySlug, hasTag, hasProperty } from '../../../modules/core/content'
import { BASE_SITE_TITLE } from '../../../config'
import { RootState } from '../../../index'

declare const window: any

function Home(): ReactElement {
  const { contentItems, currentProject } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
    currentProject: state.content.currentProject,
  }))

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-home">
        <div className="main-heroine">
          <HemRefreshHeroine
            contentItem={getContentItemBySlug(contentItems, 'home-heroine-april-2021')}
          />
        </div>
        <MainContentList
          category="home-features"
          applyCurrentFilter={false}
          items={contentItems.filter(i => hasProperty(i, 'home-features'))}
          playlistToSet={0}
          boxSecondaryTitleField="attribution"
          showCategoryOnContentBoxes={true}
          noFilters={true}
          linkTo={contentItem => `home/detail/${contentItem.slug}`}
          orderByOrder={true}
          ignoreSticky={true}
          boxBipolarY={true}
          boxWidth={275}
          boxMinMarginX={0}
          boxMarginRangeX={0}
          boxMarginRangeY={75}
        >
          {item => (
            <PlayableBoxActions
              item={item}
              contentItems={contentItems}
              currentProject={currentProject}
            />
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default Home
