import React, { ReactElement, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useLocation } from 'react-router-dom'
import Scrollbars from 'react-scrollbars-custom'
import { slugify } from 'voca'
import { compact, intersectionBy } from 'lodash'
import moment from 'moment'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../../../lib/modules/popups'
import { DetailPopUp, MainContentBox } from './index'
import { setCurrentItem, IContentItem } from '../index'
import { CampaignMonitorForm } from '../../../../../lib/components'
import { RootState } from '../../../index'
import { LISTS_HAVE_BLURBS } from '../../../config'
import { hasTag } from '../functions'

interface IProps {
  tag: string

  blurb?: string
  buttonText?: string
  children?: (contentItem: IContentItem) => any
  currentFilter?: string,
  exclusiveFilters?: string[]
  filters?: string[]
  highlights?: string[]
  infoPopupText?: string
  infoPopupTitle?: string
  linkTo?: (contentItem: IContentItem) => string
  onFiltersChanged?: () => void
  showTagsOnContentBoxes?: boolean
  title?: string
}

function MainContentList({
  tag,

  blurb,
  buttonText,
  children,
  exclusiveFilters = [],
  currentFilter = 'all',
  filters = [],
  highlights,
  infoPopupText,
  infoPopupTitle,
  linkTo,
  showTagsOnContentBoxes = false,
  title,
}: IProps): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    currentContentItem: state.content.currentContentItem,
  }))

  const dispatch = useDispatch()

  filters = compact(['All'].concat(exclusiveFilters).concat(filters))

  let contentItems = allContentItems.filter(item =>
    hasTag(item, tag) && item.published && !item.sticky
  )

  let stickyContentItems = allContentItems.filter(
    item => item.tags.includes(tag) && item.published && item.sticky
  )

  if (currentFilter && currentFilter !== 'all') {
    contentItems = contentItems.filter(item => item.tags.includes(currentFilter))
    stickyContentItems = stickyContentItems.filter(item => item.tags.includes(currentFilter))
  }

  else {
    contentItems = contentItems.filter(item =>
      intersectionBy(item.tags, exclusiveFilters.map(slugify)).length === 0
    )
  }

  function sortFn(a: IContentItem, b: IContentItem) {
    // @ts-ignore
    return moment(b.date, 'DD-MM-YYYY') - moment(a.date, 'DD-MM-YYYY')
  }

  contentItems.sort(sortFn)
  stickyContentItems.sort(sortFn)

  contentItems = stickyContentItems.concat(contentItems)

  return (
    <div className="main-content-list clearfix">
      { title && (
        <h1>
          { title }
          { infoPopupText && (
            <div
              className="header-info-badge"
              onClick={() => {
                dispatch(openPopup(tag + '-info'))
              }}
            >
              i
            </div>
          )}
        </h1>
      )}
      { LISTS_HAVE_BLURBS && (
        <div className="main-content-blurb"
          dangerouslySetInnerHTML={{__html: blurb}}
        />
      )}
      <div
        hidden
        className={`
          main-content-highlights clearfix
          ${highlights ? 'has-highlights' : ''}
        `}
      >
        { highlights && (
          highlights.map(highlight => (
            <div
              className="main-content-highlight"
              dangerouslySetInnerHTML={{__html: '– ' + highlight}}
              key={highlight}
            />
          ))
        )}
      </div>
      { filters.length > 1 && (
        <div className="main-content-filters clearfix">
          <h3>Select:</h3>
          { filters.map(name => (
            <Link
              className={`
                main-content-filter
                ${ currentFilter === slugify(name) ? 'active' : '' }
                ${ exclusiveFilters.includes(name) ? 'exclusive-filter' : '' }
              `}
              key={name}
              to={`/${tag}${name !== 'All' ? '/filter/' + slugify(name) : ''}`}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
      <div className="main-content-items">
        { contentItems.map((contentItem, index) => (
          <MainContentBox
            badgeText={showTagsOnContentBoxes ? tag : undefined}
            buttonText={buttonText}
            contentItem={contentItem}
            index={index}
            filter={currentFilter}
            key={contentItem.slug}
            linkTo={linkTo}
            tag={tag}
          >
            { children && children(contentItem) }
          </MainContentBox>
        ))}
      </div>
      { infoPopupText && (
        <PopupContainer
          id="sound-library-info"
          // @ts-ignore
          closeIcon={CloseButton}
        >
          <Scrollbars>
            <h2>{ infoPopupTitle }</h2>
            <div dangerouslySetInnerHTML={{__html: infoPopupText}} />
          </Scrollbars>
        </PopupContainer>
      )}
    </div>
  )
}

export default MainContentList
