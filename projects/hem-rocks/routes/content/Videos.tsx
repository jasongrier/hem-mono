import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { noop } from 'lodash'
import { MainContentList } from '../../modules/core/content'
import { BASE_SITE_TITLE } from '../../config'
import { PlayPauseButton } from '../../../../lib/packages/hem-buttons'

function Videos(): ReactElement {
  const { filter: currentFilter } = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-videos">
        <MainContentList
          additionalCategory="tutorials"
          currentFilter={currentFilter}
          filters={[
            'Live',
            'Music',
            'Original',
            'Random',
            'Tutorials',
          ]}
          category="videos"
          title="Videos"
        >
          {(project) => (
            <Link to={`/videos/${project.slug}`}>
              <PlayPauseButton
                playing={false}
                onClick={noop}
              />
            </Link>
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default Videos
