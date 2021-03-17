import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AboutSubnav, PlayableBoxActions } from '../../../components/layout'
import { MainContentList } from '../../../modules/core/content'
import { BASE_SITE_TITLE } from '../../../config'
import { RootState } from '../../../index'

function PressReleases(): ReactElement {
  const { allContentItems, currentProject } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    currentProject: state.content.currentProject,
  }))

  const { filter: currentFilter } = useParams() as any

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-press-releases page-with-subnav">
        <AboutSubnav />
        <MainContentList
          currentFilter={currentFilter || 'all'}
          noAll={false}
          category="press-releases"
          orderByOrder={true}
          hideFilters={['Done For Now', 'Has Multiple Artists']}
        >
          {item => (
            <PlayableBoxActions
              item={item}
              contentItems={allContentItems}
              currentProject={currentProject}
            />
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default PressReleases
