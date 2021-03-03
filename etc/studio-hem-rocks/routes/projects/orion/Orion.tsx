import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { BASE_SITE_PAGE_TITLE } from '../../../config'

function Orion(): ReactElement {
  return (
    <main className="page orion">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Orion</title>
        <meta name="description" content="" />
      </Helmet>

      <h1>Orion</h1>

      <h2>Side A</h2>
      <ol>
        <li><Link to="/projects/orion/orion">Orion</Link></li>
        <li><Link to="/projects/orion/orion">Evening Flower</Link></li>
      </ol>

      <h2>Side B</h2>
      <ol>
        <li><Link to="/projects/orion/orion">All the Black Keys</Link></li>
        <li><Link to="/projects/orion/orion">Life in Letters</Link></li>
      </ol>
    </main>
  )
}

export default Orion
