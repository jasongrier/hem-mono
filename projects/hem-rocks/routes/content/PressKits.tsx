import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../modules/content'
import { BASE_SITE_TITLE } from '../../config'

function PressKits(): ReactElement {
  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks">
        <MainContentList
          currentFilter={currentFilter}
          filters={[
            'Artists',
            'Record Releases',
            'Music',
            'Technology',
          ]}
          category="press-kits"
          title="Press Kits"
        />
      </div>
    </>
  )
}

export default PressKits
