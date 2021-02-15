import React, { ReactElement } from 'react'
import { assetHostHostname } from '../../functions'

function SoundLibraryBanner(): ReactElement {
  return (
    <div className="main-content-subnav-banner">
      <h1>SL2</h1>
      <img src={`${assetHostHostname()}/hem-rocks/site/banners/sky-2.gif`} alt=""/>
    </div>
  )
}

export default SoundLibraryBanner
