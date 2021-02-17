import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../modules/content'
import { ArticlesSubnav, MainContentBanner } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'

function Articles(): ReactElement {
  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-articles">
        <MainContentBanner>Articles</MainContentBanner>
        <ArticlesSubnav />
        <MainContentList
          currentFilter={currentFilter}
          category="articles"
          hideFilters={['Component Content', 'Hide Title', 'Home Features', 'Embedded Essay']}
          speciallyOrderedTags={['Featured']}
          boxSecondaryTitleField="attribution"
        />
      </div>
    </>
  )
}

export default Articles
