import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Footer } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'

function DemosHome(): ReactElement {
  return (
    <div className="page internal-page demos-home">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <main>
        <h1>HEM's Live Code Demos</h1>
        <section>
          <h2>Midst</h2>
          <div className="internal-page-column">
            <ul>
              <li>
                <a
                  href="http://static.hem.rocks/midst/widget-demo/"
                  target="_blank"
                >
                  Midst Javascript Widget (opens in a new window)
                </a>
              </li>
              <li><a href="#">Midst IFrame Widget</a></li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
