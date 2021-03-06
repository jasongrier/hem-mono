import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Header, Footer } from '../../components/berlin-stock-photos'
import { BASE_SITE_TITLE } from '../../config'

function BerlinStockPhotosNotFound(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }: 404 Not found</title>
        <meta name="description" content="Lushness. Weirdness. Greenery. Grit. Cheap stock photos from Berlin, Germany, updated daily." />
      </Helmet>
      <Header />
      <div className="page berlin-stock-photos bsp-page bsp-not-found-page">
        <h1>Uh oh...</h1>
        <p>We couldn't find what you're looking for.</p>
        <Footer />
      </div>
    </>
  )
}

export default BerlinStockPhotosNotFound
