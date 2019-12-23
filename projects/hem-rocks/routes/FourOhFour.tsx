import React, { ReactElement, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Header, Footer } from '../components/layout'
import { BASE_SITE_TITLE } from '../config'
import { logOut } from '../store/actions'

function FourOhFour(): ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logOut())
  }, [])

  return (
    <div className="page generic-page four-oh-four">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <main>
        <h1>Uh oh! We can't find what you're looking for</h1>
        <p>
          <Link to="/">Go home</Link>
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default FourOhFour
