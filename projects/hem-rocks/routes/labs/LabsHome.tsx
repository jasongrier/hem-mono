import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Header, Footer } from '../../components/layout'
import { ProtectedContent } from '../../components/ui'
import { BASE_SITE_TITLE } from '../../config'

function LabsHome(): ReactElement {
  return (
    <div className="page internal-page labs-home">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <ProtectedContent>
        <main>
          <h1>HEM Labs Home</h1>
          <section>
            <h2>Midst</h2>
            <div className="internal-page-column">
              <ul>
                <li>
                  <Link to="/labs/midst-flip-book">
                    Generate Midst flip books!
                  </Link>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <h2>3D in CSS</h2>
            <div className="internal-page-column">
              <ul>
                <li>
                  <Link to="/labs/room-test">
                    A dark space in CSS
                  </Link>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <h2>Utils</h2>
            <div className="internal-page-column">
              <ul>
                <li>
                  <Link to="/labs/file-task-runner">
                    Batch-rename/trim/normalize files (requires local env)
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </ProtectedContent>

      <Footer />
    </div>
  )
}

export default LabsHome
