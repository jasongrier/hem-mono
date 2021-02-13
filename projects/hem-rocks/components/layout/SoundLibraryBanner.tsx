import React, { ReactElement } from 'react'
import { assetHostHostname } from '../../functions'

function SoundLibraryBanner(): ReactElement {
  return (
    <div className="main-content-subnav-banner">
      <h1>SL</h1>
      <img src={`${assetHostHostname()}/hem-rocks/site/banners/sky-1.gif`} alt=""/>
    </div>
  )
}

export default SoundLibraryBanner
