import React, { PropsWithChildren, ReactElement } from 'react'
import { assetHostHostname } from '../../functions'

interface IProps {}

function MainContentBanner({ children }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="main-content-subnav-banner">
      <h1>{ children }</h1>
      <img src={`${assetHostHostname()}/hem.rocks/site/banners/sky-2.gif`} alt=""/>
    </div>
  )
}

export default MainContentBanner
