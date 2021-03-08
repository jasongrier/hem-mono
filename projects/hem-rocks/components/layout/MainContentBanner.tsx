import React, { PropsWithChildren, ReactElement } from 'react'
import { assetHostHostname } from '../../functions'

interface IProps {
  headline?: string
  subHeadline?: string
}

function MainContentBanner({ headline, subHeadline, children }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="main-content-subnav-banner">
      { headline && (
        <h1>{ headline }</h1>
      )}
      { subHeadline && (
        <h2>{ subHeadline }</h2>
      )}
      { children }
      <img src={`${assetHostHostname()}/hem.rocks/site/banners/sky-2.gif`} alt=""/>
    </div>
  )
}

export default MainContentBanner
