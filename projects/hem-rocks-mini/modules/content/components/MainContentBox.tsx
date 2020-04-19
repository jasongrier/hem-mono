import React, { ReactElement, PropsWithChildren, useState, useEffect } from 'react'
import { Planes } from '../../../../../lib/packages/hem-placemats'
import { SplatterDims } from '../../../../../lib/packages/hem-boxplatter'
import { LaunchDetailPopupButton } from './index'
import { IContentItem } from '../index'

interface IProps {
  action: (contentItem: any) => void
  contentItem: IContentItem
  index: number

  buttonText?: string
  className?: string
}

const FORCE_PLACEMATS = false

function MainContentBox({
  action,
  children,
  contentItem,
  index,

  buttonText,
  className,
}: PropsWithChildren<IProps>): ReactElement {
  const [alignRight, setAlignRight] = useState(false)

  useEffect(function init() {
    setAlignRight(Math.random() > 0.5)
  }, [])

  function usePlacemats(contentItem: IContentItem) {
    if (FORCE_PLACEMATS) {
      return true
    }

    return !contentItem.images[0]
  }

  return (
    <SplatterDims
      bipolarX={false}
      bipolarY={true}
      className={`
        main-content-box
        ${className}
        ${contentItem.badgeText ? 'has-badge' : ''}
        ${alignRight && index > 0 ? 'align-right' : ''}
        ${usePlacemats(contentItem) ? 'with-placemat' : 'with-photography'}
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
        { !usePlacemats(contentItem) && (
          <div
            className="main-content-box-key-art-image"
            style={{
              backgroundImage: `url(${contentItem.images[0].src})`
            }}
          >
            { contentItem.images[0].alt }
          </div>
        )}
        { usePlacemats(contentItem) && (
          <Planes />
        )}
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
        { buttonText && (
          <LaunchDetailPopupButton contentItem={contentItem}>
            { buttonText }
          </LaunchDetailPopupButton>
        )}
      </div>
    </SplatterDims>
  )
}

export default MainContentBox
