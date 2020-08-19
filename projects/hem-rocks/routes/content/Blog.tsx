import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../modules/content'
import { BASE_SITE_TITLE } from '../../config'

function Blog(): ReactElement {
  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-blog">
        <MainContentList
          currentFilter={currentFilter}
          category="blog"
          title="Blog"
        />
      </div>
    </>
  )
}

export default Blog
