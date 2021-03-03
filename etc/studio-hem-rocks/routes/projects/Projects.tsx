import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { ProjectsNav } from '../../components/content'
import { BASE_SITE_PAGE_TITLE } from '../../config'

function Projects(): ReactElement {
  return (
    <main className="page projects">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Projects</title>
        <meta name="description" content="" />
      </Helmet>

      <h1>Projects</h1>
      <ProjectsNav />
    </main>
  )
}

export default Projects
