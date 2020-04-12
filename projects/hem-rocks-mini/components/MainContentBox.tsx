import React, { ReactElement, PropsWithChildren } from 'react'
import { Planes } from '../../../lib/packages/hem-placemats'
import { LaunchDetailPopupButton } from './index'
import { IContentItem } from '../modules/content'

interface IProps {
  action: (contentItem: any) => void
  buttonText: string
  children: (contentItem: IContentItem) => ReactElement
  contentItem: any
}

function MainContentBox({
  action,
  buttonText,
  children: renderCustomActions,
  contentItem
}: IProps): ReactElement {
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
        <div className="main-content-box-custom-actions">
          { renderCustomActions(contentItem) }
        </div>
        <LaunchDetailPopupButton contentItem={contentItem}>
          { buttonText }
        </LaunchDetailPopupButton>
      </div>
    </div>
  )
}

export default MainContentBox
