import React, { ReactElement, PropsWithChildren } from 'react'
import { Planes } from '../../../../../lib/packages/hem-placemats'
import { SplatterDims } from '../../../../../lib/packages/hem-boxplatter'
import { LaunchDetailPopupButton } from './index'
import { IContentItem } from '../index'

interface IProps {
  action: (contentItem: any) => void
  buttonText: string
  contentItem: IContentItem

  index?: number
}

function MainContentBox({
  action,
  buttonText,
  children,
  contentItem,
  index,
}: PropsWithChildren<IProps>): ReactElement {
  return (
    <SplatterDims
      className="main-content-box"
      width={800}
      height={200}
      rangeX={100}
      rangeY={20}
      disabled={index < 1}
    >
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
    </SplatterDims>
  )
}

export default MainContentBox
