import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Scrollbars from 'react-scrollbars-custom'
import { slugify, titleCase } from 'voca'
import { filter, isEmpty, map } from 'lodash'
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
  applyCurrentFilter?: boolean
  shouldSetCurrentPlaylist?: boolean
  boxWidth?: number
  boxSecondaryTitleField?: 'secondaryTitle' | 'attribution'
  blurb?: string | Function
  boxBlurbs?: boolean
  buttonText?: string
  children?: (contentItem: IContentItem) => any
  currentFilter?: string,
  excludeFromAll?: string
  fixedFilters?: string[] | null
  additionalFilters?: string[]
  hideFilters?: string[]
  highlights?: string[]
  infoPopupText?: string
  infoPopupTitle?: string
  items?: IContentItem[]
  limit?: number
  linkTo?: (contentItem: IContentItem) => string
  moreTagsLink?: string | null
  noAll?: boolean
  noFilters?: boolean
  noSplatter?: boolean
  onlyTag?: string
  onFiltersChanged?: () => void
  orderByOrder?: boolean
  randomizeNonSticky?: boolean
  hideIfNoAttachments?: boolean
  showCategoryOnContentBoxes?: boolean
  title?: string
  speciallyOrderedTags?: string[]
  excludeTags?: string[]
  hasFilters?: boolean
}

function MainContentList({
  category,

  additionalCategory,
  applyCurrentFilter = true,
  shouldSetCurrentPlaylist = true,
  blurb,
  boxWidth,
  boxSecondaryTitleField,
  boxBlurbs,
  buttonText,
  children,
  excludeFromAll,
  fixedFilters,
  hideFilters,
  currentFilter = 'featured',
  highlights,
  infoPopupText,
  infoPopupTitle,
  items: propsContentItems,
  linkTo,
  moreTagsLink,
  noAll = true,
  noFilters,
  noSplatter,
  onlyTag,
  orderByOrder,
  randomizeNonSticky,
  hideIfNoAttachments = false,
  showCategoryOnContentBoxes = false,
  title,
  additionalFilters,
  speciallyOrderedTags,
  excludeTags,
  hasFilters = true,
}: IProps): ReactElement {
  const { storeContentItems, currentlyOpenPopUp } = useSelector((state: RootState) => ({
    storeContentItems: state.content.contentItems,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
  }))

  const dispatch = useDispatch()

  const [finalContentItems, setFinalContentItems] = useState<IContentItem[]>([])
  const [finalFilters, setFinalFilters] = useState<string[]>([])

  useEffect(function filters() {
    let semifinalFilters: Array<string | undefined>

    if (noFilters) return

    if (fixedFilters) {
      semifinalFilters = fixedFilters
    }

    else {
      const contentItems = (propsContentItems || storeContentItems).filter(item =>
        item.published && hasCategory(item, category)
      )

      if (!contentItems) return
      if (!contentItems.length) return

      const allFilters = contentItems.map(item => item.tags.split(',').map(tag => tag.trim()))
      const allFiltersFlat = flatten(allFilters)

      let filters: string[] = uniq(allFiltersFlat.map(tag => titleCase(tag).replace(/-/g, ' ')))

      if (hideFilters) {
        filters = filters.filter(f => !hideFilters.includes(f))
      }

      filters.sort()

      semifinalFilters = filters

      if (additionalFilters) {
        semifinalFilters = semifinalFilters.concat(additionalFilters)
      }
    }

    if (speciallyOrderedTags) {
      for (const soTag of speciallyOrderedTags) {
        const soIndex = semifinalFilters.findIndex(f => f === soTag)

        if (typeof soIndex === 'number' && soIndex > -1) {
          semifinalFilters[soIndex] = undefined
        }
      }

      semifinalFilters = speciallyOrderedTags.concat(compact(semifinalFilters))
    }

    if (excludeTags) {
      for (const exTag of excludeTags) {
        const exIndex = semifinalFilters.findIndex(f => f === exTag)

        if (typeof exIndex === 'number' && exIndex > -1) {
          semifinalFilters[exIndex] = undefined
        }
      }

      semifinalFilters = compact(semifinalFilters)
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
          return (hasCategory(item, category) || hasCategory(item, additionalCategory)) && item.published
        }

        else {
          return hasCategory(item, category) && item.published
        }
      })
    }

    let stickyContentItems = filter(Array.from(contentItems), { sticky: true })

    contentItems = filter(contentItems, { sticky: false })

    if (onlyTag) {
      contentItems = contentItems.filter(item => hasTag(item, onlyTag))
      stickyContentItems = stickyContentItems.filter(item => hasTag(item, onlyTag))
    }

    else if (applyCurrentFilter && currentFilter && currentFilter !== 'all') {
      contentItems = contentItems.filter(item => hasTag(item, currentFilter))
      stickyContentItems = stickyContentItems.filter(item => hasTag(item, currentFilter))
    }

    else if (excludeFromAll) {
      contentItems = contentItems.filter(item => {
        return !hasTag(item, slugify(excludeFromAll))
      })
    }

    if (hideIfNoAttachments) {
      contentItems = contentItems.filter(item => !isEmpty(item.attachments))
    }

    if (randomizeNonSticky) {
      contentItems = shuffle(contentItems)

      if (orderByOrder) {
        stickyContentItems.sort(orderSortFn)
      }
    }

    else if (orderByOrder) {
      stickyContentItems.sort(orderSortFn)
      contentItems.sort(orderSortFn)
    }

    else {
      stickyContentItems.sort(dateSortFn)
      contentItems.sort(dateSortFn)
    }

    contentItems = stickyContentItems.concat(contentItems)

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
          const attachedTracks = getContentItemsFromRawList(storeContentItems, item.attachments).map(track =>
            contentItemToTrack(track)
          )
          tracks = tracks.concat(attachedTracks)
        }
      }

      if (shouldSetCurrentPlaylist && tracks.length) {
        dispatch(replacePlaylist(5, { name: 'On this page', tracks }))
        dispatch(setPlayerPlaylist(5))
      }

      else {
        dispatch(replacePlaylist(5, { name: 'EMPTY', tracks: [] }))
        dispatch(setPlayerPlaylist(0))
      }
    })
  }, [currentFilter, storeContentItems, currentlyOpenPopUp])

  const onFilterClick = useCallback(() => {
    // const body = document.querySelector('.scroll-lock-content')
    // const filterBox = document.querySelector('.main-content-filters')

    // if (body) {
    //   body.scrollIntoView(true)
    // }

    // if (filterBox) {
    //   filterBox.scrollIntoView(true)
    // }
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

  let boxTemplateIndex = -1

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
      {/* <div
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
      </div> */}
      { hasFilters && finalFilters.length > 1 && (
        <div className="main-content-filters clearfix">
          <div className="main-content-filters-inner">
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
        </div>
      )}
      {console.log('====')}
      <div className="main-content-items">
        { finalContentItems.map((contentItem: IContentItem, index: number) => {
          console.log(contentItem.title)

          boxTemplateIndex = boxTemplateIndex < 8 ? boxTemplateIndex + 1 : 0

          return (
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
              width={boxWidth}
              buttonText={buttonText}
              contentItem={contentItem}
              index={index}
              filter={currentFilter}
              key={contentItem.slug}
              linkTo={linkTo}
              noSplatter={noSplatter}
              secondaryTitleField={boxSecondaryTitleField}
              tag={category}
              showBlurb={boxBlurbs}
            >
              { children && children(contentItem) }
            </MainContentBox>
          )
        })}
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
