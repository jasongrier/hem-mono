import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Scrollbars from 'react-scrollbars-custom'
import { slugify, titleCase } from 'voca'
import { get, uniq, flatten, compact } from 'lodash'
import moment from 'moment'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../../../lib/modules/popups'
import { replacePlaylist, setPlayerPlaylist, ITrack } from '../../../../../lib/modules/website-player'
import { MainContentBox } from './index'
import { IContentItem } from '../index'
import { RootState } from '../../../index'
import { LISTS_HAVE_BLURBS, RELEASE_PHASE } from '../../../config'
import { hasTag, hasCategory, contentItemToTrack, getContentItemsFromRawList } from '../functions'

interface IProps {
  category: string

  additionalCategory?: string
  shouldSetCurrentPlaylist?: boolean
  blurb?: string | Function
  buttonText?: string
  children?: (contentItem: IContentItem) => any
  currentFilter?: string,
  excludeFromAll?: string
  highlights?: string[]
  infoPopupText?: string
  infoPopupTitle?: string
  items?: IContentItem[]
  linkTo?: (contentItem: IContentItem) => string
  noSplatter?: boolean
  onlyTag?: string
  onFiltersChanged?: () => void
  orderByOrder?: boolean
  showCategoryOnContentBoxes?: boolean
  title?: string
}

function MainContentList({
  category,

  additionalCategory,
  shouldSetCurrentPlaylist = true,
  blurb,
  buttonText,
  children,
  excludeFromAll,
  currentFilter = 'all',
  highlights,
  infoPopupText,
  infoPopupTitle,
  items: propsContentItems,
  linkTo,
  noSplatter,
  onlyTag,
  orderByOrder,
  showCategoryOnContentBoxes = false,
  title,
}: IProps): ReactElement {
  const { storeContentItems, currentlyOpenPopUp } = useSelector((state: RootState) => ({
    storeContentItems: state.content.contentItems,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
  }))

  const dispatch = useDispatch()

  const [finalContentItems, setFinalContentItems] = useState<IContentItem[]>([])
  const [finalFilters, setFinalFilters] = useState<string[]>([])

  useEffect(function filters() {
    const contentItems = (propsContentItems || storeContentItems).filter(item =>
      item.published && parseInt(item.releasePhase, 10) <= RELEASE_PHASE && hasCategory(item, category) 
    )

    if (!contentItems) return
    if (!contentItems.length) return

    const allFilters = contentItems.map(item => item.tags.split(',').map(tag => tag.trim()))
    const allFiltersFlat = flatten(allFilters)
    let filters: string[] = uniq(allFiltersFlat.map(tag => titleCase(tag).replace(/-/g, ' ')))
    filters.sort()
    
    filters = ['All'].concat(filters)

    setFinalFilters(compact(filters))

  }, [storeContentItems])

  useEffect(function itemsAndPlaylist() {
    let contentItems: IContentItem[]

    if (propsContentItems) {
      contentItems = propsContentItems
    }

    else {
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
      
      if (onlyTag) {
        contentItems = contentItems.filter(item => hasTag(item, onlyTag))
        stickyContentItems = stickyContentItems.filter(item => hasTag(item, onlyTag))
      }
      
      else if (currentFilter && currentFilter !== 'all') {
        contentItems = contentItems.filter(item => hasTag(item, currentFilter))
        stickyContentItems = stickyContentItems.filter(item => hasTag(item, currentFilter))
      }

      else if (excludeFromAll) {
        contentItems = contentItems.filter(item => {
          return !hasTag(item, slugify(excludeFromAll))
        })
      }

      if (orderByOrder) {
        contentItems.sort(orderSortFn)
        stickyContentItems.sort(orderSortFn)
      }

      else {
        contentItems.sort(dateSortFn)
        stickyContentItems.sort(dateSortFn)
      }

      contentItems = stickyContentItems.concat(contentItems)
    }

    contentItems = contentItems.filter((item: IContentItem) =>
      parseInt(item.releasePhase, 10) <= RELEASE_PHASE
    )

    setFinalContentItems(contentItems)

    setTimeout(function () {
      if (currentlyOpenPopUp) return

      let tracks: ITrack[] = []

      for (const item of contentItems) {
        if (hasCategory(item, 'tracks')) {
          tracks.push(contentItemToTrack(item))
        }

        else {
          const attachedTracks = getContentItemsFromRawList(storeContentItems, item.trackSlugs).map(track =>
            contentItemToTrack(track)
          )
          tracks = tracks.concat(attachedTracks)
        }
      }

      dispatch(replacePlaylist(1, { name: 'Current Page', tracks }))

      if (tracks.length && shouldSetCurrentPlaylist) {
        dispatch(setPlayerPlaylist(1))
      }
    })
  }, [currentFilter, storeContentItems, currentlyOpenPopUp])

  function dateSortFn(a: IContentItem, b: IContentItem) {
    // @ts-ignore
    return moment(b.date, 'DD-MM-YYYY') - moment(a.date, 'DD-MM-YYYY')
  }
  
  function orderSortFn(a: IContentItem, b: IContentItem) {
    return parseInt(a.order, 10) - parseInt(b.order, 10)
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
      { LISTS_HAVE_BLURBS && blurb && (
        typeof blurb === 'string'
          ?
          <div className="main-content-blurb"
            dangerouslySetInnerHTML={{ __html: blurb }}
          />
          :
          <div className="main-content-blurb">
            { blurb() }
          </div>
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
      { finalFilters.length > 1 && (
        <div className="main-content-filters clearfix">
          <h3>Filter:</h3>
          { finalFilters.map(tag => (
            <Link
              className={`
                main-content-filter
                ${ currentFilter === slugify(tag) ? 'active' : '' }
                ${ currentFilter === slugify(excludeFromAll) ? 'exclusive-filter' : '' }
              `}
              key={tag}
              to={
                currentFilter === slugify(tag)
                  ? `/${category}`
                  : `/${category}${tag !== 'All' ? '/filter/' + slugify(tag) : ''}`
              }
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      <div className="main-content-items">
        { finalContentItems.map((contentItem: IContentItem, index: number) => (
          <MainContentBox
            badgeText={
              showCategoryOnContentBoxes
                ? titleCase(
                  contentItem.displayCategory
                    ? contentItem.displayCategory
                    : hasCategory(contentItem, 'articles')
                      ? get(contentItem.tags.split(','), 0)
                      : contentItem.category.replace(/-/g, ' '))
                : undefined
            }
            buttonText={buttonText}
            contentItem={contentItem}
            index={index}
            filter={currentFilter}
            key={contentItem.slug}
            linkTo={linkTo}
            noSplatter={noSplatter}
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
