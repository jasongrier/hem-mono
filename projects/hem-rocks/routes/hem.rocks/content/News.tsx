import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../../modules/core/content'
import { ArticlesSubnav, MainContentBanner } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'

function News(): ReactElement {
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
          // speciallyOrderedTags={['Featured']}
          boxSecondaryTitleField="attribution"
        />
      </div>
    </>
  )
}

export default News
