import React, { ReactElement, PropsWithChildren, useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Planes } from '../../../../../lib/packages/hem-placemats'
import { SplatterDims } from '../../../../../lib/packages/hem-boxplatter'
import { LaunchDetailPopupButton } from './index'
import { IContentItem, setCurrentItem } from '../index'

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
      dispatch(setCurrentItem(contentItem))
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
        with-photography-x
        main-content-box-date-${contentItem.date}
        ${className ? className : ''}
        ${contentItem.badgeText ? 'has-badge' : ''}
        ${alignRight && index > 0 ? 'align-right' : ''}
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
          {/* <div
            className="main-content-box-key-art-image"
            style={{
              backgroundImage: `url(http://static.hem.rocks/hem-rocks/content/images/${contentItem.slug}.jpg)`
            }}
          /> */}
          <div className="main-content-box-key-art-image">
            <Planes />
          </div>
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
