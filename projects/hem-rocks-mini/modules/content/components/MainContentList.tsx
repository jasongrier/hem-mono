import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Scrollbars from 'react-scrollbars-custom'
import { slugify, titleCase } from 'voca'
import { compact, intersectionBy } from 'lodash'
import moment from 'moment'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../../../lib/modules/popups'
import { MainContentBox } from './index'
import { IContentItem } from '../index'
import { RootState } from '../../../index'
import { LISTS_HAVE_BLURBS } from '../../../config'
import { hasTag, hasCategory } from '../functions'

interface IProps {
  category: string

  additionalCategory?: string
  blurb?: string
  buttonText?: string
  children?: (contentItem: IContentItem) => any
  currentFilter?: string,
  excludeFromAll?: string
  filters?: string[]
  highlights?: string[]
  infoPopupText?: string
  infoPopupTitle?: string
  items?: IContentItem[]
  linkTo?: (contentItem: IContentItem) => string
  onFiltersChanged?: () => void
  showCategoryOnContentBoxes?: boolean
  title?: string
}

function MainContentList({
  category,

  additionalCategory,
  blurb,
  buttonText,
  children,
  excludeFromAll,
  currentFilter = 'all',
  filters = [],
  highlights,
  infoPopupText,
  infoPopupTitle,
  items: propsContentItems,
  linkTo,
  showCategoryOnContentBoxes = false,
  title,
}: IProps): ReactElement {
  const { storeContentItems } = useSelector((state: RootState) => ({
    storeContentItems: state.content.contentItems,
    currentContentItem: state.content.currentContentItem,
  }))

  const dispatch = useDispatch()

  let contentItems

  if (propsContentItems) {
    contentItems = propsContentItems
  }

  else {

    filters = compact(['All'].concat(filters))

    contentItems = storeContentItems.filter(item => {
      if (additionalCategory) {
        return (hasCategory(item, category) || hasCategory(item, additionalCategory)) && item.published && !item.sticky
      }

      else {
        return hasCategory(item, category) && item.published && !item.sticky
      }
    })

    let stickyContentItems = storeContentItems.filter(
      item => hasCategory(item, category) && item.published && item.sticky
    )

    if (currentFilter && currentFilter !== 'all') {
      contentItems = contentItems.filter(item => hasTag(item, currentFilter))
      stickyContentItems = stickyContentItems.filter(item => hasTag(item, currentFilter))
    }

    else if (excludeFromAll) {
      contentItems = contentItems.filter(item => {
        if (item.slug === 'flow') {
          console.log(hasTag(item, slugify(excludeFromAll)))
        }
        return !hasTag(item, slugify(excludeFromAll))
      })
    }

    function sortFn(a: IContentItem, b: IContentItem) {
      // @ts-ignore
      return moment(b.date, 'DD-MM-YYYY') - moment(a.date, 'DD-MM-YYYY')
    }

    contentItems.sort(sortFn)
    stickyContentItems.sort(sortFn)

    contentItems = stickyContentItems.concat(contentItems)
  }

  return (
    <div className="main-content-list clearfix">
      { title && (
        <h1>
          { title }
          { infoPopupText && (
            <div
              className="header-info-badge"
              onClick={() => {
                dispatch(openPopup(category + '-info'))
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
          { filters.map(tag => (
            <Link
              className={`
                main-content-filter
                ${ currentFilter === slugify(tag) ? 'active' : '' }
                ${ currentFilter === slugify(excludeFromAll) ? 'exclusive-filter' : '' }
              `}
              key={tag}
              to={`/${category}${tag !== 'All' ? '/filter/' + slugify(tag) : ''}`}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      <div className="main-content-items">
        { contentItems.map((contentItem: IContentItem, index: number) => (
          <MainContentBox
            badgeText={showCategoryOnContentBoxes ? titleCase(contentItem.displayCategory || contentItem.category.replace(/-/g, ' ')) : undefined}
            buttonText={buttonText}
            contentItem={contentItem}
            index={index}
            filter={currentFilter}
            key={contentItem.slug}
            linkTo={linkTo}
            tag={category}
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
