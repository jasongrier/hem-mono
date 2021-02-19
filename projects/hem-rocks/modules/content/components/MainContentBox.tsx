import React, { ReactElement, PropsWithChildren, useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import marked from 'marked'
import { SplatterDims, Tilt } from '../../../../../lib/packages/hem-boxplatter'
import { assetHostHostname } from '../../../functions'
import { BERLIN_STOCK_PHOTOS } from '../../../config'
import { IContentItem, setCurrentItem, MainContentBoxActions, hasCategory } from '../index'

interface IProps {
  contentItem: IContentItem
  filter: string
  index: number
  tag: string

  badgeText?: ReactElement | string
  bipolarX?: boolean
  bipolarY?: boolean
  buttonText?: string
  className?: string
  linkTo?: (contentItem: IContentItem) => string
  marginRangeX?: number
  marginRangeY?: number
  minMarginX?: number
  minMarginY?: number
  noSplatter?: boolean
  noTilt?: boolean
  rangeX?: number
  rangeY?: number
  renderActionsOn?: 'key-art' | 'text'
  secondaryTitleField?: 'secondaryTitle' | 'attribution'
  showBlurb?: boolean
  width?: number
  height?: number
}

function MainContentBox({
  children,
  contentItem,
  filter,
  index,

  badgeText,
  buttonText,
  className,
  linkTo: customLinkTo,
  noSplatter,
  noTilt,
  width = 400,
  height,
  secondaryTitleField = 'secondaryTitle',
  showBlurb = true,
  minMarginX = 50,
  minMarginY = 30,
  marginRangeX = 0,
  marginRangeY = 0,
  rangeX,
  rangeY,
  renderActionsOn = 'text'
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
    : `/${contentItem.category.split(',')[0]}/${contentItem.slug}${filter ? '/' + filter : ''}`

  const assetHost = assetHostHostname()

  return (
    <SplatterDims
      disabled={noSplatter}
      bipolarX={false}
      bipolarY={false}
      minMarginX={minMarginX}
      minMarginY={minMarginY}
      className={`
        main-content-box
        main-content-box-date-${contentItem.date}
        ${className ? className : ''}
        ${(badgeText || contentItem.badgeText) ? 'has-badge' : ''}
        ${alignRight && index > 0 ? 'align-right' : ''}
      `}
      id={contentItem.slug}
      width={width}
      height={height || 0}
      rangeX={rangeX || 100}
      rangeY={rangeY || 0}
      marginRangeX={marginRangeX}
      marginRangeY={marginRangeY}
    >
      <Tilt disabled={noTilt}>
        {(badgeText || contentItem.badgeText) && (
          <div className="main-content-box-badge">
            <strong>{ badgeText || contentItem.badgeText }</strong>
          </div>
        )}
        <Link to={linkTo}>
          {contentItem[secondaryTitleField] && (
            <h4 dangerouslySetInnerHTML={{ __html: contentItem[secondaryTitleField] }} />
          )}
          <h3 dangerouslySetInnerHTML={{ __html: contentItem.titleWrapping || contentItem.title }} />
        </Link>
        <div
          className="main-content-box-key-art"
          onClick={onClick}
        >
          { renderActionsOn === 'key-art'
            && buttonText
            && (
              <MainContentBoxActions
                linkTo={linkTo}
                buttonText={buttonText}
              >
                { children }
              </MainContentBoxActions>
          )}
          <Link to={linkTo}>
            { !BERLIN_STOCK_PHOTOS && (
              <div
                className="main-content-box-key-art-image"
                style={{
                  backgroundImage: `url(${assetHost}/hem-rocks/content/images/key-art/${contentItem.keyArt})`
                }}
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
        <div
          className="main-content-box-text"
          onClick={onClick}
        >
          { showBlurb && (
            <Link to={linkTo}>
              <div dangerouslySetInnerHTML={{ __html: marked(contentItem.blurb) }} />
            </Link>
          )}
          { renderActionsOn === 'text'
            && buttonText
            && (
              <MainContentBoxActions
                linkTo={linkTo}
                buttonText={buttonText}
              >
                { children }
              </MainContentBoxActions>
          )}
        </div>
      </Tilt>
    </SplatterDims>
  )
}

export default MainContentBox
