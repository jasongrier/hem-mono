import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { MainContentList } from '../modules/content'
import { BASE_SITE_TITLE } from '../config'

function Apps(): ReactElement {

  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-apps">
        <MainContentList
          currentFilter={currentFilter}
          filters={[
            'Composition',
            'Expanded Poetics',
            'Pedagogy',
            'Performance',
            'Sound Studies',
          ]}
          category="apps"
          title="Apps"
        >
          {(project) => (
            <Link to={`/apps/${project.slug}`}>
              { project.acceptingDonations ? 'Contribute' : 'Learn more' }
            </Link>
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default Apps
