import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Header } from '../../components/berlin-stock-photos'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'

function About(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page berlin-stock-photos bsp-page bsp-about-page">
        <Header />
        <img 
          className="bsp-about-image"
          src={`${assetHostHostname()}/berlin-stock-photos/site/images/about.jpg`} alt="Berlin Stock Photos"
        />
      </div>
    </>
  )
}

export default About
