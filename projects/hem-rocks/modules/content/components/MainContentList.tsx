import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Scrollbars from 'react-scrollbars-custom'
import { slugify, titleCase } from 'voca'
import ReactGA from 'react-ga'
import { get, uniq, flatten, compact, last, shuffle } from 'lodash'
import moment from 'moment'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../../../lib/modules/popups'
import { replacePlaylist, setPlayerPlaylist, ITrack } from '../../../../../lib/modules/website-player'
import { MainContentBox } from './index'
import { IContentItem, setCurrentItems } from '../index'
import { RootState } from '../../../index'
import { LISTS_HAVE_BLURBS, RELEASE_PHASE } from '../../../config'
import { hasTag, hasCategory, contentItemToTrack, getContentItemsFromRawList, tagSpellingCorrections } from '../functions'

interface IProps {
  category: string

  additionalCategory?: string
  shouldSetCurrentPlaylist?: boolean
  blurb?: string | Function
  buttonText?: string
  children?: (contentItem: IContentItem) => any
  currentFilter?: string,
  excludeFromAll?: string
  fixedFilters?: string[] | null
  highlights?: string[]
  infoPopupText?: string
  infoPopupTitle?: string
  items?: IContentItem[]
  limit?: number
  linkTo?: (contentItem: IContentItem) => string
  moreTagsLink?: string | null
  noAll?: boolean
  noSplatter?: boolean
  onlyTag?: string
  onFiltersChanged?: () => void
  orderByOrder?: boolean
  randomizeNonSticky?: boolean
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
  fixedFilters,
  currentFilter = 'all',
  highlights,
  infoPopupText,
  infoPopupTitle,
  items: propsContentItems,
  linkTo,
  moreTagsLink,
  noAll,
  noSplatter,
  onlyTag,
  orderByOrder,
  randomizeNonSticky,
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
    let semifinalFilters

    if (fixedFilters) {
      semifinalFilters = fixedFilters
    }

    else {
      const contentItems = (propsContentItems || storeContentItems).filter(item =>
        item.published && parseInt(item.releasePhase, 10) <= RELEASE_PHASE && hasCategory(item, category)
      )

      if (!contentItems) return
      if (!contentItems.length) return

      const allFilters = contentItems.map(item => item.tags.split(',').map(tag => tag.trim()))
      const allFiltersFlat = flatten(allFilters)
      let filters: string[] = uniq(allFiltersFlat.map(tag => titleCase(tag).replace(/-/g, ' ')))
      filters.sort()

      semifinalFilters = filters
    }

    if (noAll === true) {
      setFinalFilters(compact(semifinalFilters))
    }

    else {
      setFinalFilters(['All'].concat(compact(semifinalFilters)))
    }
  }, [storeContentItems, fixedFilters, noAll])

  useEffect(function itemsAndPlaylist() {
    let contentItems: IContentItem[]

    if (propsContentItems) {
      contentItems = propsContentItems
    }

    else {
      const storeContentItemsImm = Array.from(storeContentItems)

      contentItems = storeContentItemsImm.filter(item => {
        if (additionalCategory) {
          return (hasCategory(item, category) || hasCategory(item, additionalCategory)) && item.published && !item.sticky
        }

        else {
          return hasCategory(item, category) && item.published && !item.sticky
        }
      })

      let stickyContentItems = storeContentItemsImm.filter(
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

      if (randomizeNonSticky) {
        contentItems = shuffle(contentItems)

        if (orderByOrder) {
          stickyContentItems.sort(orderSortFn)
        }
      }

      else if (orderByOrder) {
        contentItems.sort(orderSortFn)
        stickyContentItems.sort(orderSortFn)
      }

      else {
        contentItems.sort(dateSortFn)
        stickyContentItems.sort(dateSortFn)
      }

      contentItems = stickyContentItems.concat(contentItems.slice(0, 102))
    }

    // contentItems = contentItems.filter((item: IContentItem) =>
    //   parseInt(item.releasePhase, 10) <= RELEASE_PHASE
    // )

    setFinalContentItems(contentItems)
    dispatch(setCurrentItems(contentItems))

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

      if (tracks.length) {
        dispatch(replacePlaylist(1, { name: 'On this page', tracks }))
      }

      if (tracks.length && shouldSetCurrentPlaylist) {
        dispatch(setPlayerPlaylist(1))
      }
    })
  }, [currentFilter, storeContentItems, currentlyOpenPopUp])

  const onFilterClick = useCallback(() => {
    const body = document.querySelector('.scroll-lock-content')
    const filterBox = document.querySelector('.main-content-filters')

    if (body) {
      body.scrollIntoView(true)
    }

    if (filterBox) {
      filterBox.scrollIntoView(true)
    }
  }, [])

  useEffect(function onFilterChanged() {
    ReactGA.event({
      category: 'User',
      action: 'Clicked a filter: ' + currentFilter,
    })
  }, [currentFilter])

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
              key={ tag }
              to={
                currentFilter === slugify(tag) && !noAll
                  ? `/${category}`
                  : `/${category}${tag !== 'All' ? '/filter/' + slugify(tag) : ''}`
              }
            >
              <span
                onClick={onFilterClick}
                dangerouslySetInnerHTML={{ __html: tagSpellingCorrections(tag).replace(/ /g, '&nbsp;') }}
              />
            </Link>
          ))}
          { moreTagsLink && (
            <Link
              className="main-content-filter"
              to={moreTagsLink}
            >
              More Tags...
            </Link>
          )}
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
