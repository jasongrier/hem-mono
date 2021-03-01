import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../../modules/core/content'
import { BASE_SITE_TITLE } from '../../../config'

function UserGuides(): ReactElement {
  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-user-guides">
        <MainContentList
          currentFilter={currentFilter}
          category="user-guides"
          title="User Guides"
        />
      </div>
    </>
  )
}

export default UserGuides
