import React, { ReactElement, PropsWithChildren } from 'react'
import { Planes } from '../../../lib/packages/hem-placemats'

interface IProps {
  action: (contentItem: any) => void
  contentItem: any
}

function MainContentBox({ action, children, contentItem }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className="main-content-box">
      <div
        className="main-content-box-key-art"
        onClick={() => {
          // launchBuyPopup(pack)
          action(contentItem)
        }}
      >
        <Planes />
      </div>
      <div
        className="main-content-box-text"
        onClick={() => {
          action(contentItem)
        }}
      >
        <h3>{ contentItem.name }</h3>
        <p>{ contentItem.blurb }</p>
      </div>
      <div className="main-content-box-actions">
        { children }
      </div>
    </div>
  )
}

export default MainContentBox
