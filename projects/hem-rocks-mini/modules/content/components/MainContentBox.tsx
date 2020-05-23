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

  const assetHost = window.location.hostname === 'localhost'
    ? 'http://localhost:8888'
    : 'http://static.hem.rocks'

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
      width={400}
      height={0}
      rangeX={100}
      rangeY={0}
      marginRangeX={index < 0 ? 100 : 0}
      marginRangeY={index < 0 ? 200 : 0}
    >
      { contentItem.badgeText && (
        <div className="main-content-box-badge">
          <strong>{  contentItem.badgeText }</strong>
        </div>
      )}
      <Link to={linkTo}>
        <h3 dangerouslySetInnerHTML={{__html: contentItem.nameWrapping || contentItem.name}} />
      </Link>
      <div
        className="main-content-box-key-art"
        onClick={onClick}
      >
        <Link to={linkTo}>
          <div
            className="main-content-box-key-art-image"
            style={{
              backgroundImage: `url(${assetHost}/hem-rocks/content/images/key-art/${contentItem.slug}.jpg)`
            }}
          />
        </Link>
      </div>
      <div
        className="main-content-box-text"
        onClick={onClick}
      >
        <Link to={linkTo}>
          {/* <p>{ contentItem.blurb }</p> */}
          <p>I'm baby locavore sartorial pinterest pickled swag, lumbersexual shabby chic poke ramps hot chicken kinfolk unicorn paleo hella. Organic man braid chambray church-key four loko vice hella butcher dreamcatcher kombucha farm-to-table. Everyday carry vaporware coloring book stumptown, ramps actually offal fam. Gastropub squid pour-over skateboard taiyaki VHS asymmetrical jean shorts tacos tattooed vegan. Fixie vinyl ramps pabst aesthetic skateboard hammock biodiesel.</p>
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
