import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
// @ts-ignore
import autop from 'lines-to-paragraphs'
import { LaunchDetailPopupButton, MainContentList } from '../modules/content'
import { BASE_SITE_TITLE } from '../config'

function Label(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-projects">
        <MainContentList
          blurb={autop(`
          `)}
          buttonText={undefined}
          campaignMonitorId="5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756"
          filters={[
            'Composition',
            'Desktop/Mobile Apps',
            'Electron',
            'Javascript',
            'New Media',
            'NPM Modules',
            'Expanded Poetics',
            'React',
            'Sound Studies',
          ]}
          tag="projects"
          title="Projects"
        >
          {(project) => (
            <Link to={`/projects/${project.slug}`}>
              { project.acceptingDonations ? 'Contribute' : 'Learn more' }
            </Link>
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default Label
