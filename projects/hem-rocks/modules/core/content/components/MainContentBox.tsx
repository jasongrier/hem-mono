import React, { ReactElement, PropsWithChildren, useCallback, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import marked from 'marked'
import { SplatterDims, Tilt } from '../../../../../../lib/packages/hem-boxplatter'
import { assetHostHostname } from '../../../../functions'
import { IContentItem, setCurrentItem, MainContentBoxActions } from '../index'
import { RootState } from '../../../../index'

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
  hasKeyArt: (contentItem: IContentItem, index: number) => boolean
  height?: number
  hotZoneTop?: number
  hotZoneBottom?: number
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
}

function MainContentBox({
  children,
  contentItem,
  filter,
  index,

  badgeText,
  buttonText,
  className,
  hasKeyArt = () => true,
  hotZoneTop,
  hotZoneBottom,
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
  const { currentProject } = useSelector((state: RootState) => ({
    currentProject: state.content.currentProject,
  }))

  const dispatch = useDispatch()

  const [alignRight, setAlignRight] = useState<boolean>(false)
  const [inTheHotZone, setInTheHotZone] = useState<boolean>(false)

  const el = useRef<null | HTMLDivElement>(null)

  useEffect(function initAlignRight() {
    setAlignRight(Math.random() > 0.5)
  }, [])

  useEffect(function initScrollSpy() {
    const scrollContainer = document.querySelector('.scroll-lock-container')
    const scrollContent = document.querySelector('.scroll-lock-content')

    if (typeof hotZoneTop !== 'number') return
    if (typeof hotZoneBottom !== 'number') return
    if (!scrollContainer) return
    if (!scrollContent) return

    function scrollSpy() {
      setInTheHotZone(
        el.current.getBoundingClientRect().top - scrollContent.scrollTop > hotZoneTop
        && el.current.getBoundingClientRect().top - scrollContent.scrollTop < hotZoneBottom
      )
    }

    scrollContainer.addEventListener('scroll', scrollSpy)

    scrollSpy()

    return function cleanup() {
      scrollContainer.removeEventListener('scroll', scrollSpy)
    }
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
    <div
      className="main-content-box-ref"
      ref={el}
    >
      <Link to={linkTo}>
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
            ${inTheHotZone ? 'main-content-box-hot' : ''}
          `}
          id={`main-content-box-${contentItem.slug}`}
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
            { hasKeyArt(contentItem, index) && (
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
                  <div
                    className="main-content-box-key-art-image"
                    style={{
                      backgroundImage: `url(${assetHost}/${currentProject.replace(/\./g, '-')}/content/images/key-art/${contentItem.keyArt})`
                    }}
                  />
              </div>
            )}
            <div
              className="main-content-box-text"
              onClick={onClick}
            >
              <>
                {contentItem[secondaryTitleField] && (
                  <h4 dangerouslySetInnerHTML={{ __html: contentItem[secondaryTitleField] }} />
                )}
                <h3 dangerouslySetInnerHTML={{ __html: contentItem.titleWrapping || contentItem.title }} />
              </>
              { showBlurb && (
                <div dangerouslySetInnerHTML={{ __html: marked(contentItem.blurb) }} />
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
      </Link>
    </div>
  )
}

export default MainContentBox