import React, { ReactElement, PropsWithChildren, useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Planes } from '../../../../../lib/packages/hem-placemats'
import { SplatterDims } from '../../../../../lib/packages/hem-boxplatter'
import { usePlacemats } from '../../../functions'
import { LaunchDetailPopupButton } from './index'
import { IContentItem, setCurrentContentItem } from '../index'

interface IProps {
  contentItem: IContentItem
  filter: string
  index: number
  tag: string

  buttonText?: string
  className?: string
}

function MainContentBox({
  children,
  contentItem,
  filter,
  index,
  tag,

  buttonText,
  className,
}: PropsWithChildren<IProps>): ReactElement {
  const dispatch = useDispatch()
  const [alignRight, setAlignRight] = useState(false)

  useEffect(function init() {
    setAlignRight(Math.random() > 0.5)
  }, [])

  const onClick = useCallback(
    function onClickFn() {
      dispatch(setCurrentContentItem(contentItem))
    }, [],
  )

  const linkTo = `/${tag}/${contentItem.slug}${filter ? '/' + filter : ''}`

  return (
    <SplatterDims
      bipolarX={false}
      bipolarY={false}
      minMarginX={50}
      minMarginY={30}
      className={`
        main-content-box
        main-content-box-date-${contentItem.date}
        ${className ? className : ''}
        ${contentItem.badgeText ? 'has-badge' : ''}
        ${alignRight && index > 0 ? 'align-right' : ''}
        ${usePlacemats(contentItem) ? 'with-placemat' : 'with-photography'}
      `}
      width={300}
      height={0}
      rangeX={100}
      rangeY={0}
      marginRangeX={100}
      marginRangeY={200}
      disabled={index < 1}
    >
      { contentItem.badgeText && (
        <div className="main-content-box-badge">
          <strong>{  contentItem.badgeText }</strong>
        </div>
      )}
      <div
        className="main-content-box-key-art"
        onClick={onClick}
      >
        <Link to={linkTo}>
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
        </Link>
      </div>
      <div
        className="main-content-box-text"
        onClick={onClick}
      >
        <Link to={linkTo}>
          <h3 dangerouslySetInnerHTML={{__html: contentItem.nameWrapping || contentItem.name}} />
          <p>{ contentItem.blurb }</p>
        </Link>
      </div>
      <div className="main-content-box-actions">
        <div className="main-content-box-custom-actions">
          { children }
        </div>
        { buttonText && (
          <Link
            className="action-button"
            to={linkTo}
          >
            { buttonText }
          </Link>
        )}
      </div>
    </SplatterDims>
  )
}

export default MainContentBox
