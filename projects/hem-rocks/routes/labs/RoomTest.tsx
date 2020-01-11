import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Footer } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'

function RoomTest(): ReactElement {
  return (
    <div className="page internal-page room-test">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <main>
        <section id="container">
          <div id="room">
            <figure className="n">N</figure>
            <figure className="e">O</figure>
            <figure className="s">Z</figure>
            <figure className="w">W</figure>
            <figure className="t">T</figure>
            <figure className="b">B</figure>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default RoomTest
