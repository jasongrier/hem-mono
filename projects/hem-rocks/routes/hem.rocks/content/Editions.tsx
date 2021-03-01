import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../modules/core/content'
import { BASE_SITE_TITLE } from '../../config'

function Editions(): ReactElement {
  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-editions">
        <MainContentList
          currentFilter={currentFilter}
          category="articles"
        />
      </div>
    </>
  )
}

export default Editions
