import React, { PropsWithChildren, ReactElement } from 'react'

interface IProps {}

function SiteFrame({}: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="jag-rip-site-frame"></div>
  )
}

export default SiteFrame
