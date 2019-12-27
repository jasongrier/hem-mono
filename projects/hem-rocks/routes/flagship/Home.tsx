import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { Header, Footer, ArticlesGrid, PencilExtras, ProjectsGrid } from '../../components/layout'
import { SneakyHero } from '../../components/ui'
import { RootState } from '../../store'
import { BASE_SITE_TITLE } from '../../config'

const pencilExtrasItems = {
  left: [
    { text: 'About', type: 'internal', url: '/about' },
    { text: 'Articles', type: 'internal', url: '/articles' },
    { text: 'Sound & Video', type: 'internal', url: '/media' },
    { text: 'Label', type: 'internal', url: '/label' },
  ],
  right: [
    { text: 'Github', type: 'external', url: 'http://google.com' },
    { text: 'NPM', type: 'external', url: 'http://google.com' },
    { text: 'Instagram', type: 'external', url: 'http://google.com' },
    { text: 'info@hem.rocks', type: 'external', url: 'mailto:info@hem.rocks' },
  ],
}

function Home(): ReactElement {
  const { articles, projects } = useSelector((state: RootState) => ({
    articles: state.app.articles.filter(a => a.featured).slice(0, 12),
    projects: state.app.projects.filter(p => p.featured),
  }))

  return (
    <div className="page home">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <SneakyHero>
        <ProjectsGrid projects={projects} />
      </SneakyHero>

      <PencilExtras items={pencilExtrasItems} />

      <ArticlesGrid
        articles={articles}
        heading="Latest News"
      />

      <Footer />
    </div>
  )
}

export default Home
