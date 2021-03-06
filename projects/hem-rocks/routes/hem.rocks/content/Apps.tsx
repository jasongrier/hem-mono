import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { MainContentList } from '../../../modules/core/content'
import { BASE_SITE_TITLE } from '../../../config'

function Apps(): ReactElement {
  const { filter: currentFilter } = useParams() as any

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-apps">
        <MainContentList
          currentFilter={currentFilter || 'all'}
          noAll={false}
          category="apps"
          title="Apps"
        >
          {(project) => (
            <div className="action-button">
              <Link to={`/apps/${project.slug}`}>
                { project.acceptingDonations ? 'Contribute' : 'Learn more' }
              </Link>
            </div>
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default Apps
