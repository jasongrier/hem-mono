import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { MainContentList } from '../../modules/content'
import { BASE_SITE_TITLE } from '../../config'

function Press(): ReactElement {

  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-press">
        <MainContentList
          currentFilter={currentFilter}
          filters={[
            'Label',
            'Sound Library',
            'Technology',
            'Events',
          ]}
          category="apps"
          title="Apps"
        />
      </div>
    </>
  )
}

export default Press
