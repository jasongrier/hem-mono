import React, { ReactElement, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Header, Footer } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'
import { logOut } from '../../modules/login'

function LogOut(): ReactElement {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logOut())
  }, [])

  return (
    <div className="page generic-page log-out">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <main>
        <h1>You are now logged out</h1>
        <p>
          <Link to="/">Go home</Link>
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default LogOut
