import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { DemosNav } from '../components/content'
import { BASE_SITE_TITLE } from '../config'

function Home(): ReactElement {
  return (
    <main className="page home">
      <Helmet>
        <title>{BASE_SITE_TITLE}</title>
        <meta name="description" content="" />
      </Helmet>

      <p>Space for utilities, prototyping, live coding, works-in-progress, etc.</p>
      <p>Browse the <Link to="/demos">demos</Link> to see what stuff can be done</p>
      <p>Browse the <Link to="/projects">projects</Link> to see what stuff can be done</p>
      {/* TODO: Link to zip; deploy task to update zip (without projects) */}
      <p>Download the source code here</p>

      <h2>Quick Start</h2>
      <p>TBA</p>

      <h2>Demos</h2>
      <DemosNav />

      <h2>Projects</h2>
      <nav>
        <ul>
          <li>
            <Link to="/projects/orion">Orion</Link>
          </li>
        </ul>
      </nav>

      <h2>Documentation</h2>
      <p>TBA</p>
    </main>
  )
}

export default Home
