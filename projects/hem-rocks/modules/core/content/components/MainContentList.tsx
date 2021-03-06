import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Scrollbars from 'react-scrollbars-custom'
import { slugify, titleCase } from 'voca'
import { filter, isEmpty, find, isNaN, intersection } from 'lodash'
import ReactGA from 'react-ga'
import { map, findIndex, compact, shuffle } from 'lodash'
import { CloseButton } from '../../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../../../../lib/modules/popups'
import { replacePlaylist, setPlayerPlaylist, addPlaylist, ITrack } from '../../../../../../lib/modules/website-player'
import { MainContentBox } from './index'
import { IContentItem, setCurrentItems } from '../index'
import { RootState } from '../../../../index'
import { getReleasePhase } from '../../app'
import { LISTS_HAVE_BLURBS, PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'
import { hasTag, hasCategory, contentItemToTrack, orderSortFnFact, getTagsInCollection, getContentItemsFromList, smartSlugify, tagSpellingCorrections, getContentItemById, modelize, getTags } from '../functions'
import { requestReadChunk } from '../actions'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

interface IProps {
  category: string

  additionalCategory?: string
  additionalFilters?: string[]
  appendTagLinks?: Array<{ title: string, url: string }>
  applyCurrentFilter?: boolean
  blurb?: string | Function
  boxBipolarX?: boolean
  boxBipolarY?: boolean
  boxBlurbs?: boolean
  boxHeight?: number
  boxHasKeyArt?: (contentItem: IContentItem, index: number) => boolean
  boxHasReadOnLink?: boolean
  boxHotZoneTop?: number
  boxHotZoneBottom?: number
  boxMarginRangeX?: number
  boxMarginRangeY?: number
  boxMinMarginX?: number
  boxMinMarginY?: number
  boxRangeX?: number
  boxRangeY?: number
  boxSecondaryTitleField?: 'secondaryTitle' | 'attribution'
  boxWidth?: number
  buttonText?: string
  children?: (contentItem: IContentItem) => any
  currentFilter?: string,
  excludeFromAll?: string | string[]
  excludeTags?: string[]
  extraBottomBoxes?: any[]
  fixedFilters?: string[] | null
  hasFilters?: boolean
  hideFilters?: string[]
  hideIfNoAttachments?: boolean
  highlights?: string[]
  ignoreSticky?: boolean
  infoPopupText?: string
  infoPopupTitle?: string
  items?: IContentItem[]
  limit?: number
  limitTags?: string[]
  linkTo?: (contentItem: IContentItem) => string
  moreTagsLink?: string | null
  noAll?: boolean
  noFilters?: boolean
  noSplatter?: boolean
  onFiltersChanged?: () => void
  onlyTag?: string
  orderByOrder?: boolean
  orderByTitle?: boolean
  playlistToSet?: number
  prependTagLinks?: Array<{ title: string, url: string }>
  randomizeNonSticky?: boolean
  randomizeTags?: string[]
  shouldSetCurrentPlaylist?: boolean
  showCategoryOnContentBoxes?: boolean
  speciallyOrderedTags?: string[]
  tagLimit?: number
  title?: string
}

function MainContentList({
  category,

  additionalCategory,
  additionalFilters,
  appendTagLinks = [],
  applyCurrentFilter = true,
  blurb,
  boxBipolarX,
  boxBipolarY,
  boxBlurbs,
  boxHasKeyArt,
  boxHeight,
  boxHotZoneTop,
  boxHotZoneBottom,
  boxMarginRangeX,
  boxMarginRangeY,
  boxMinMarginX,
  boxMinMarginY,
  boxSecondaryTitleField,
  boxRangeX,
  boxRangeY,
  boxWidth,
  boxHasReadOnLink = true,
  buttonText,
  children,
  currentFilter = 'featured',
  excludeFromAll,
  excludeTags,
  extraBottomBoxes,
  fixedFilters,
  hasFilters = true,
  hideFilters,
  hideIfNoAttachments = false,
  ignoreSticky = false,
  infoPopupText,
  infoPopupTitle,
  items: propsContentItems,
  limitTags,
  linkTo,
  moreTagsLink,
  noAll = true,
  noFilters,
  noSplatter,
  onlyTag,
  orderByOrder,
  orderByTitle,
  playlistToSet,
  prependTagLinks = [],
  randomizeNonSticky,
  randomizeTags,
  shouldSetCurrentPlaylist = true,
  showCategoryOnContentBoxes = false,
  speciallyOrderedTags,
  tagLimit = 9,
  title,
}: IProps): ReactElement {
  const {
    chunkLog,
    currentProject,
    currentlyOpenPopUp,
    playlists,
    storeContentItems,
  } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    currentProject: state.content.currentProject,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
    playlists: state.player.playlists,
    storeContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const location = useLocation()

  const [finalContentItems, setFinalContentItems] = useState<IContentItem[]>([])
  const [finalFilters, setFinalFilters] = useState<string[]>([])
  const [pagePlaylistSet, setPagePlaylistSet] = useState<boolean>(false)

  useEffect(function getChunk() {
    if (
      additionalCategory
      && !chunkLog.includes(category)
      && !chunkLog.includes(additionalCategory)
    ) {
      dispatch(requestReadChunk(category))
      dispatch(requestReadChunk(additionalCategory))
    }

    else if (!chunkLog.includes(category)) {
      dispatch(requestReadChunk(category))
    }
  }, [chunkLog])

  useEffect(function filters() {
    let semifinalFilters: Array<string | undefined>

    if (noFilters) return

    if (fixedFilters) {
      semifinalFilters = fixedFilters
    }

    else {
      let contentItems

      if (additionalCategory) {
        contentItems = (propsContentItems || storeContentItems).filter(item =>
          item.published
          && item.project === currentProject
          && (hasCategory(item, category) || hasCategory(item, additionalCategory))
        )
      }

      else {
        contentItems = (propsContentItems || storeContentItems).filter(item =>
          item.published
          && item.project === currentProject
          && hasCategory(item, category)
        )
      }

      if (!contentItems) return
      if (!contentItems.length) return
      if (!currentProject) return

      const releasePhase = getReleasePhase(currentProject)

      let filters: string[] = getTagsInCollection(
        contentItems.filter(i => parseInt(i.releasePhase, 10) <= releasePhase)
      ).map(t => titleCase(t).replace(/-/g, ' '))

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
      const validSpeciallyOrderedTags = intersection(speciallyOrderedTags, semifinalFilters)

      for (const soTag of validSpeciallyOrderedTags) {
        const soIndex = semifinalFilters.findIndex(f => f === soTag)

        if (typeof soIndex === 'number' && soIndex > -1) {
          semifinalFilters[soIndex] = undefined
        }
      }

      semifinalFilters = validSpeciallyOrderedTags.concat(compact(semifinalFilters))
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
  }, [storeContentItems, fixedFilters, noAll, currentProject])

  useEffect(function itemsAndPlaylist() {
    if (!currentProject) return

    let contentItems: IContentItem[]

    if (propsContentItems) {
      contentItems = propsContentItems
    }

    else {
      const storeContentItemsImm = Array.from(storeContentItems)

      contentItems = storeContentItemsImm.filter(item => {
        if (additionalCategory) {
          return (
            item.project === currentProject
            && (hasCategory(item, category) || hasCategory(item, additionalCategory))
            && item.published
          )
        }

        else {
          return (
            item.project === currentProject
            && item.published
            && hasCategory(item, category)
          )
        }
      })
    }

    let stickyContentItems = filter(Array.from(contentItems), { sticky: true })

    if (!ignoreSticky) {
      contentItems = filter(contentItems, { sticky: false })
    }

    if (onlyTag) {
      contentItems = contentItems.filter(item => hasTag(item, onlyTag))
      stickyContentItems = stickyContentItems.filter(item => hasTag(item, onlyTag))
    }

    else if (applyCurrentFilter && currentFilter && currentFilter !== 'all') {
      contentItems = contentItems.filter(item => hasTag(item, currentFilter))
      stickyContentItems = stickyContentItems.filter(item => hasTag(item, currentFilter))
    }

    else if (excludeFromAll) {
      if (typeof excludeFromAll === 'string') {
        contentItems = contentItems.filter(item => {
          return !hasTag(item, slugify(excludeFromAll))
        })
      }

      else {
        contentItems = contentItems.filter(item => {
          let keep = true

          for (const tag of excludeFromAll) {
            if (hasTag(item, slugify(tag))) {
              keep = false
              break
            }
          }

          return keep
        })
      }
    }

    if (hideIfNoAttachments) {
      contentItems = contentItems.filter(item => !isEmpty(item.attachments))
    }

    if (randomizeNonSticky) {
      contentItems = shuffle(contentItems)

      if (orderByOrder) {
        stickyContentItems.sort(orderSortFnFact(currentFilter))
      }
    }

    else if (orderByOrder) {
      stickyContentItems.sort(orderSortFnFact(currentFilter))
      contentItems.sort(orderSortFnFact(currentFilter))
    }

    else if (orderByTitle) {
      stickyContentItems.sort(titleSortFn)
      contentItems.sort(titleSortFn)
    }

    else {
      stickyContentItems.sort(dateSortFn)
      contentItems.sort(dateSortFn)
    }

    if (!ignoreSticky) {
      contentItems = stickyContentItems.concat(contentItems)
    }

    const releasePhase = getReleasePhase(currentProject)

    if (releasePhase > 0) {
      contentItems = contentItems.filter(item => {
        const itemReleasePhase = parseInt(item.releasePhase, 10)

        if (!isNaN(itemReleasePhase)) {
          return itemReleasePhase <= releasePhase
        }

        else {
          return true
        }
      })
    }

    if (randomizeTags?.length && randomizeTags.includes(currentFilter)) {
      contentItems = shuffle(contentItems)
    }

    if (limitTags?.length && limitTags.includes(currentFilter)) {
      contentItems = contentItems.slice(0, tagLimit)
    }

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
          const attachmentIds = item.attachments.split('\n')

          for (const id of attachmentIds) {
            const attachment = getContentItemById(storeContentItems, id)

            if (!attachment) continue

            if (hasCategory(attachment, 'playlists')) {
              const playlistTracks = getContentItemsFromList(storeContentItems, attachment.slug, currentProject).map(track =>
                contentItemToTrack(track)
              )
              tracks = tracks.concat(playlistTracks)
            }

            else if (hasCategory(attachment, 'tracks')) {
              tracks.push(contentItemToTrack(attachment))
            }
          }
        }
      }

      if (PROJECT_CONFIGS[currentProject].HAS_PLAYER) {
        if (shouldSetCurrentPlaylist && tracks.length) {
          const pagePlaylistIndex = findIndex(playlists, { name: 'On this page' })
          const selectedPlaylistIndex = findIndex(playlists, { name: 'Selected playlist' })

          if (!playlistToSet) {
            if (playlists[selectedPlaylistIndex]?.tracks.length) {
              playlistToSet = selectedPlaylistIndex
            }

            else if (pagePlaylistIndex > -1) {
              playlistToSet = pagePlaylistIndex
            }

            else {
              playlistToSet = 0
            }
          }

          if (pagePlaylistIndex > -1) {
            if (!pagePlaylistSet) {
              dispatch(replacePlaylist(pagePlaylistIndex, { name: 'On this page', tracks }))
              setPagePlaylistSet(true)
            }
          }

          dispatch(setPlayerPlaylist(playlistToSet))
        }
      }
    })
  }, [currentFilter, storeContentItems, currentlyOpenPopUp, currentProject, playlists, pagePlaylistSet])

  useEffect(function onFilterChanged() {
    ReactGA.event({
      category: 'User',
      action: 'Clicked a filter: ' + currentFilter,
    })
  }, [currentFilter])

  function dateSortFn(a: IContentItem, b: IContentItem) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const [aMonth, aYear] = a.date.split(' ')
    const [bMonth, bYear] = b.date.split(' ')

    if (parseInt(aYear, 10) === parseInt(bYear, 10)) {
      return months.indexOf(bMonth) - months.indexOf(aMonth)
    }

    else {
      return parseInt(bYear, 10) - parseInt(aYear, 10)
    }
  }

  function titleSortFn(a: IContentItem, b: IContentItem) {
    if(a.title < b.title) { return -1 }
    if(a.title > b.title) { return 1 }
    return 0
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
      { hasFilters && finalFilters.length > 1 && (
        <div className="main-content-filters clearfix">
          <div className="main-content-filters-inner">
            <h3>Filter:</h3>
            { prependTagLinks.map(tag => (
              <Link
                className={`
                  main-content-filter
                  ${ currentFilter === slugify(tag.title) ? 'main-content-filter-active' : '' }
                `}
                key={tag.title}
                to={tag.url}
              >
                <span dangerouslySetInnerHTML={{ __html: tagSpellingCorrections(tag.title).replace(/ /g, '&nbsp;') }} />
              </Link>
            ))}
            { finalFilters.map(tag => (
              <Link
                className={`
                  main-content-filter
                  ${ currentFilter === smartSlugify(tag) ? 'main-content-filter-active' : '' }
                `}
                key={tag}
                to={
                  currentFilter === smartSlugify(tag) && !noAll
                    ? `/${category}`
                    : `/${category}${tag !== 'All' ? '/filter/' + smartSlugify(tag) : ''}`
                }
              >
                <span dangerouslySetInnerHTML={{
                  __html: tagSpellingCorrections(tag)
                    .replace('%26', ' &amp; ')
                    .replace(/ /g, '&nbsp;')
                  }}
                />
              </Link>
            ))}
            { appendTagLinks.map(tag => (
              <Link
                className={`
                  main-content-filter
                  ${ currentFilter === slugify(tag.title) ? 'main-content-filter-active' : '' }
                `}
                key={tag.title}
                to={tag.url}
              >
                <span dangerouslySetInnerHTML={{ __html: tagSpellingCorrections(tag.title).replace(/ /g, '&nbsp;') }} />
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
      <div className="main-content-items">
        { finalContentItems.map((contentItem: IContentItem, index: number) => {
          boxTemplateIndex = boxTemplateIndex < 8 ? boxTemplateIndex + 1 : 0

          return (
            <MainContentBox
              badgeText={
                showCategoryOnContentBoxes
                  ?
                    <Link to={`${slugify(contentItem.displayCategory || contentItem.category)}/`}>
                      {titleCase(contentItem.displayCategory || contentItem.category).replace(/-/g, ' ')}
                    </Link>
                  : undefined
              }
              bipolarX={boxBipolarX}
              bipolarY={boxBipolarY}
              buttonText={buttonText}
              contentItem={contentItem}
              filter={currentFilter}
              height={boxHeight}
              hasKeyArt={boxHasKeyArt}
              hasReadOnLink={boxHasReadOnLink}
              index={index}
              hotZoneBottom={boxHotZoneBottom}
              hotZoneTop={boxHotZoneTop}
              key={contentItem.id}
              linkTo={linkTo}
              marginRangeX={boxMarginRangeX}
              marginRangeY={boxMarginRangeY}
              minMarginX={boxMinMarginX}
              minMarginY={boxMinMarginY}
              noSplatter={noSplatter}
              rangeX={boxRangeX}
              rangeY={boxRangeY}
              secondaryTitleField={boxSecondaryTitleField}
              showBlurb={boxBlurbs}
              tag={category}
              width={boxWidth}
            >
              { children && children(contentItem) }
            </MainContentBox>
          )
        })}
        { extraBottomBoxes && extraBottomBoxes.map((contentItem, key) => (
          <MainContentBox
            badgeText=""
            bipolarX={boxBipolarX}
            bipolarY={boxBipolarY}
            buttonText={buttonText}
            contentItem={modelize({})}
            filter={currentFilter}
            height={boxHeight}
            hasKeyArt={boxHasKeyArt}
            index={key}
            hotZoneBottom={boxHotZoneBottom}
            hotZoneTop={boxHotZoneTop}
            key={key}
            linkTo={linkTo}
            marginRangeX={boxMarginRangeX}
            marginRangeY={boxMarginRangeY}
            minMarginX={boxMinMarginX}
            minMarginY={boxMinMarginY}
            noSplatter={noSplatter}
            rangeX={boxRangeX}
            rangeY={boxRangeY}
            secondaryTitleField={boxSecondaryTitleField}
            showBlurb={boxBlurbs}
            tag={category}
            width={boxWidth}
          />
        ))}
      </div>
      { infoPopupText && (
        <PopupContainer
          id="sound-library-info"
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
