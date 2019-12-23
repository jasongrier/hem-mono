import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Header, InternalHeader, Footer } from '../../components/layout'
import { ProtectedContent } from '../../components/ui'
import { BASE_SITE_TITLE } from '../../config'

function MidstJavascriptWidgetDemo(): ReactElement {
  return (
    <div className="page internal-page demos-home">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <main>
        <h1>Demo: Midst Javascript Widget</h1>
      </main>

      <Footer />
    </div>
  )
}

export default MidstJavascriptWidgetDemo
