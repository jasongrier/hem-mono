import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'

function CompilationIVArtistInfo(): ReactElement {
  return (
    <>
    <Helmet>
      <title>{ BASE_SITE_TITLE }</title>
      <meta name="description" content="" />
    </Helmet>
    <div className="page page-compilation-iv-info">
      <h1>Compilation IV</h1>
      <p>
        <img
          alt="HEM Compilation IV artist info"
          src={`${assetHostHostname()}/hem-rocks/content/images/key-art/info-page.jpg`}
          style={{
            float: 'left',
            width: '450px',
            height: 'auto',
          }}
        />
        I'm baby locavore sartorial pinterest pickled swag, lumbersexual shabby chic poke ramps hot chicken kinfolk unicorn paleo hella. Organic man braid chambray church-key four loko vice hella butcher dreamcatcher kombucha farm-to-table.
      </p>
      <p>I'm baby locavore sartorial pinterest pickled swag, lumbersexual shabby chic poke ramps hot chicken kinfolk unicorn paleo hella. Organic man braid chambray church-key four loko vice hella butcher dreamcatcher kombucha farm-to-table.</p>
      <p>I'm baby locavore sartorial pinterest pickled swag, lumbersexual shabby chic poke ramps hot chicken kinfolk unicorn paleo hella. Organic man braid chambray church-key four loko vice hella butcher dreamcatcher kombucha farm-to-table.</p>
      <p>I'm baby locavore sartorial pinterest pickled swag, lumbersexual shabby chic poke ramps hot chicken kinfolk unicorn paleo hella. Organic man braid chambray church-key four loko vice hella butcher dreamcatcher kombucha farm-to-table.</p>
      <p>I'm baby locavore sartorial pinterest pickled swag, lumbersexual shabby chic poke ramps hot chicken kinfolk unicorn paleo hella. Organic man braid chambray church-key four loko vice hella butcher dreamcatcher kombucha farm-to-table.</p>
    </div>
  </>
  )
}

export default CompilationIVArtistInfo
