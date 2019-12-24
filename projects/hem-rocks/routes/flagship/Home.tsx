import React, { ReactElement, useState, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Footer, NewsList, PencilExtras, ProjectsList } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'

function Home(): ReactElement {
  const [projectsListOpen, setProjectsListOpen] = useState(false)

  const onHeaderLogoClicked = useCallback(
    function onHeaderLogoClicked() {
      setProjectsListOpen(false)
    }, [],
  )

  return (
    <div className="page home">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header onLogoClicked={onHeaderLogoClicked} />

      <ProjectsList
        open={projectsListOpen}
        setOpen={setProjectsListOpen}
      />

      <PencilExtras />
      <NewsList />
      <Footer />
    </div>
  )
}

export default Home
