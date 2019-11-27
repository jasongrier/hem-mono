import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_TITLE } from '../config'

function Home(): ReactElement {
  return (
    <div className="home-page">
      <Helmet>
        <title>{BASE_SITE_TITLE}</title>
        <meta name="description" content="" />
      </Helmet>

      <section className="heroine">
        <p className="first">
          What if you could watch your favorite poet write?
        </p>
{/*
        <p style={{ color: 'darkred', paddingTop: '20px' }}>
          <a href="http://midst.press/read">Let’s find out.</a>
        </p> */}

        <p style={{ paddingTop: '20px' }}>
          Midst is a new digital journal publishing poems in the form of interactive timelapses. You’ll see the finished text by default, but then you can rewind it to see exactly how it was written: start to finish, blank page to final draft, and every edit in between.
        </p>

        <p style={{ paddingTop: '10px' }} />
      </section>
    </div>
  )
}

export default Home
