import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { MainContentList } from '../modules/content'
import { BASE_SITE_TITLE } from '../config'

function Code(): ReactElement {

  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-code">
        <MainContentList
          additionalCategory="apps"
          currentFilter={currentFilter}
          filters={[
            'Composition',
            'Desktop/Mobile Apps',
            'Electron',
            'Expanded Poetics',
            'Javascript',
            'New Media',
            'NPM Modules',
            'Pedagogy',
            'Performance',
            'React',
            'Sound Studies',
          ]}
          category="code"
          title="Code"
        >
          {(project) => (
            <Link to={`/code/${project.slug}`}>
              { project.acceptingDonations ? 'Contribute' : 'Learn more' }
            </Link>
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default Code
