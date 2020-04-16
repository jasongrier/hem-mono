import React, { ReactElement, PropsWithChildren, useState, useEffect } from 'react'
import { Planes } from '../../../../../lib/packages/hem-placemats'
import { SplatterDims, SplatterVertices } from '../../../../../lib/packages/hem-boxplatter'
import { LaunchDetailPopupButton } from './index'
import { IContentItem } from '../index'

interface IProps {
  action: (contentItem: any) => void
  buttonText: string
  contentItem: IContentItem
  index: number

  className?: string
}

function MainContentBox({
  action,
  buttonText,
  children,
  contentItem,
  index,

  className,
}: PropsWithChildren<IProps>): ReactElement {
  const [alignRight, setAlignRight] = useState(false)

  useEffect(function init() {
    setAlignRight(Math.random() > 0.5)
  }, [])

  return (
    <SplatterDims
      bipolarX={false}
      bipolarY={true}
      className={`
        main-content-box
        ${className}
        ${contentItem.badgeText ? 'has-badge' : ''}
        ${alignRight && index > 0 ? 'align-right' : ''}
      `}
      width={300}
      height={0}
      rangeX={100}
      rangeY={0}
      disabled={index < 1}
    >
      { contentItem.badgeText && (
        <div className="main-content-box-badge">
          <strong>{  contentItem.badgeText }</strong>
        </div>
      )}
      <div
        className="main-content-box-key-art"
        onClick={() => {
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
    </SplatterDims>
  )
}

export default MainContentBox
