import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList, contentItemToTrack } from '../../../modules/core/content'
import { BASE_SITE_TITLE } from '../../../config'

function Tutorials(): ReactElement {
  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tutorials">
        <MainContentList
          currentFilter={currentFilter}
          category="tutorials"
          title="Tutorials"
        />
      </div>
    </>
  )
}

export default Tutorials
