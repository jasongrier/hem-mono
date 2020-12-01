import React, { ReactElement, PropsWithChildren, useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import marked from 'marked'
import { EnlargeButton } from '../../../../../lib/packages/hem-buttons'
import { SplatterDims } from '../../../../../lib/packages/hem-boxplatter'
import { assetHostHostname } from '../../../functions'
import { BERLIN_STOCK_PHOTOS } from '../../../config'
import { IContentItem, setCurrentItem } from '../index'

interface IProps {
  contentItem: IContentItem
  filter: string
  index: number
  tag: string
  templateIndex: number

  badgeText?: string
  buttonText?: string
  className?: string
  linkTo?: (contentItem: IContentItem) => string
  noSplatter?: boolean
}

function MainContentBox({
  children,
  contentItem,
  filter,
  index,
  // TODO: Unused var
  tag,
  templateIndex,

  badgeText,
  buttonText,
  className,
  linkTo: customLinkTo,
  noSplatter,
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

  const linkTo = customLinkTo
    ? customLinkTo(contentItem)
    : `/${contentItem.category}/${contentItem.slug}${filter ? '/' + filter : ''}`

  const assetHost = assetHostHostname()

  return (
    <div className={`
      main-content-box
      main-content-box-${index}
      main-content-box-template-${templateIndex}
    `}>
      {(badgeText || contentItem.badgeText) && (
        <div className="main-content-box-badge clearfix">
          <span>{ badgeText || contentItem.badgeText }</span>
        </div>
      )}
      <div
        className="main-content-box-key-art"
        onClick={onClick}
      >
        <Link to={linkTo}>
          { !BERLIN_STOCK_PHOTOS && (
            <img
              className="main-content-box-key-art-image-as-img"
              src={`${assetHost}/hem-rocks/content/images/key-art/${contentItem.keyArt}`}
              alt=""
            />
          )}
          { BERLIN_STOCK_PHOTOS && (
            <>
              <div className="bsp-enlarge-button action-button">
                { contentItem.isPhysicalProduct ? 'Order now' : 'Download' }
              </div>
              <div
                className="main-content-box-key-art-image"
                style={{
                  backgroundImage: `url(${assetHost}/berlin-stock-photos/content/images/jpg-thumbs/${contentItem.keyArt})`
                }}
              />
            </>
          )}
          { BERLIN_STOCK_PHOTOS && index <= 10 && (
            <div
              className="main-content-box-key-art-placeholder"
              style={{
                backgroundImage: `url(${assetHost}/berlin-stock-photos/content/images/jpg-placeholders/${contentItem.keyArt})`
              }}
            />
          )}
        </Link>
      </div>
      <div className="main-content-box-details">
        <Link to={linkTo}>
          <h3 dangerouslySetInnerHTML={{ __html: contentItem.titleWrapping || contentItem.title }} />
        </Link>
        {/* {(badgeText || contentItem.badgeText) && (
          <h4>
            <span>{ badgeText || contentItem.badgeText }</span>
          </h4>
        )} */}
        <Link to={linkTo}>
          <div dangerouslySetInnerHTML={{ __html: marked(contentItem.blurb) }} />
        </Link>
        {/* <div className="main-content-box-actions">
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
        </div> */}
      </div>
    </div>
  )
}

export default MainContentBox
