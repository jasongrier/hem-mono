import React, { ReactElement, useState, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Header, Footer, ArticlesGrid, PencilExtras, ProjectsList } from '../../components/layout'
import { RootState } from '../../store'
import { BASE_SITE_TITLE } from '../../config'

function Home(): ReactElement {
  const { articles } = useSelector((state: RootState) => ({
    articles: state.app.articles.filter(a => a.featured).slice(0, 12),
  }))

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
      <ArticlesGrid
        articles={articles}
        heading="Latest News"
      />
      <Footer />
    </div>
  )
}

export default Home
