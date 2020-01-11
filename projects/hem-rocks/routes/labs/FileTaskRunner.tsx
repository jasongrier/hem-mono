import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Footer } from '../../components/layout'
import { ProtectedContent } from '../../components/ui'
import { BASE_SITE_TITLE } from '../../config'

function FileTaskRunner(): ReactElement {
  return (
    <div className="page internal-page file-task-runner">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <ProtectedContent>
        <main>
          <h1>File Task Runner</h1>
          <section>
            <h2>Trigger actions...</h2>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={() => {}}
                >
                  Rename 1 (for HEM Viola)
                </a>
              </li>
            </ul>
          </section>
        </main>
      </ProtectedContent>

      <Footer />
    </div>
  )
}

export default FileTaskRunner
