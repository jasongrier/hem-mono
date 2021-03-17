import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../../modules/core/content'
import { ArticlesSubnav, MainContentBanner, PlayableBoxActions } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'
import { RootState } from '../../../index'

function News(): ReactElement {
  const { contentItems, currentProject } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
    currentProject: state.content.currentProject,
  }))

  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-news">
        <MainContentBanner
          headline="News"
        />
        <ArticlesSubnav />
        <MainContentList
          currentFilter={currentFilter || 'monthly-updates'}
          category="news"
          hideFilters={['Component Content', 'Hide Title', 'Home Features']}
          boxSecondaryTitleField="attribution"
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

export default News
