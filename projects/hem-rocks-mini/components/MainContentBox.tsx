import React, { ReactElement, PropsWithChildren } from 'react'
import { Planes } from '../../../lib/packages/hem-placemats'
import { LaunchDetailPopupButton } from './index'
import { IContentItem } from '../modules/content'

interface IProps {
  action: (contentItem: any) => void
  buttonText: string
  contentItem: IContentItem
}

function MainContentBox({
  action,
  buttonText,
  children,
  contentItem
}: PropsWithChildren<IProps>): ReactElement {
  const isComingSoon = contentItem.badgeText === 'Coming Soon'

  return (
    <div className={`
      main-content-box
      ${ isComingSoon ? 'coming-soon' : '' }
    `}>
      { contentItem.badgeText && (
        <div className="main-content-box-coming-soon-badge">
          <strong>{  contentItem.badgeText }</strong>
        </div>
      )}
      <div className="main-content-box-content">
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
            { children }
          </div>
          <LaunchDetailPopupButton contentItem={contentItem}>
            { buttonText }
          </LaunchDetailPopupButton>
        </div>
      </div>
    </div>
  )
}

export default MainContentBox
