import React, { PropsWithChildren, ReactElement } from 'react'
import { assetHostHostname } from '../../functions'

interface IProps {}

function TracksBanner({ children }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="main-content-subnav-banner tracks-banner">
      <h1>{ children }</h1>
      <img src={`${assetHostHostname()}/hem-rocks/site/banners/sky-2.gif`} alt=""/>
    </div>
  )
}

export default TracksBanner
