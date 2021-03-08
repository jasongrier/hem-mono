import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../../modules/core/content'
import { ArticlesSubnav, MainContentBanner } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'

function Blog(): ReactElement {
  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-blog">
        <MainContentBanner
          headline="Blog"
        />
        <ArticlesSubnav />
        <MainContentList
          currentFilter={currentFilter}
          category="blog"
          hideFilters={['Component Content', 'Hide Title', 'Home Features']}
          speciallyOrderedTags={['Featured']}
          boxSecondaryTitleField="attribution"
        />
      </div>
    </>
  )
}

export default Blog
