import React, { ReactElement, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Footer, NewsList, PencilExtras, ProjectsList } from '../components/layout'
import { BASE_SITE_TITLE } from '../config'

function Home(): ReactElement {
  return (
    <div className="page home">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <ProjectsList />

      <PencilExtras />
      <NewsList />
      <Footer />
    </div>
  )
}

export default Home
