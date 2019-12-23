import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Header, InternalHeader, Footer } from '../../components/layout'
import { ProtectedContent } from '../../components/ui'
import { BASE_SITE_TITLE } from '../../config'

function InternalHome(): ReactElement {
  return (
    <div className="page internal-page midst-widgets">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <ProtectedContent header="Enter password to view this content">
        <InternalHeader />

        <main>
          <h1>HEM's Internal Pages</h1>
          <section>
            <h2>Quick Links: Infrastructure</h2>
            <div className="internal-page-column">
              <h3>Active Jira Projects</h3>
              <ul>
                <li><a href="#">Midst</a></li>
                <li><a href="#">Midst Journal</a></li>
                <li><a href="#">Seurat</a></li>
                <li><a href="#">Relineator</a></li>
              </ul>
            </div>
            <div className="internal-page-column">
              <h3>Important How-Tos</h3>
              <ul>
                <li><a href="#">Where to find Passwords to stuff</a></li>
                <li><a href="#">Creating/Managing FTP Accounts</a></li>
                <li><a href="#">Creating/Managing Email Accounts</a></li>
                <li><a href="#">Creating/Managing Subdomains</a></li>
                <li><a href="#">Managing the Mailing List</a></li>
                <li><a href="#">The "Monorepo" Code Repository</a></li>
                <li><a href="#">Exporting NPM modules from Mono</a></li>
                <li><a href="#">Domain Registrations</a></li>
                <li><a href="#">Hard Drive / Content Backups</a></li>
                <li><a href="#">Deploying Press Pages</a></li>
              </ul>
            </div>
            <div className="internal-page-column">
              <h3>Published NPM Packages</h3>
              <ul>
                <li><a href="#">Foo</a></li>
                <li><a href="#">Foo</a></li>
                <li><a href="#">Foo</a></li>
                <li><a href="#">Foo</a></li>
              </ul>
            </div>
          </section>
          <section>
            <h2>Quick Links: Midst</h2>
            <ul>
              <li><a href="#">Updating Midst Journal</a></li>
              <li>
                <Link to="/internal/midst-widgets">Using Midst Widgets</Link>
              </li>
              <li><a href="#">Developing/Deploying Midst App</a></li>
            </ul>
          </section>
        </main>
      </ProtectedContent>

      <Footer />
    </div>
  )
}

export default InternalHome
