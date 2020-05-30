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
          blurb={undefined}
          buttonText={undefined}
          campaignMonitorId="5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756"
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
          tag="code"
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
