import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Scrollbars from 'react-scrollbars-custom'
import { slugify, titleCase } from 'voca'
import { get } from 'lodash'
import moment from 'moment'
import { CloseButton } from '../../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../../../lib/modules/popups'
import { replacePlaylist, setPlayerPlaylist } from '../../../../../lib/modules/player'
import { MainContentBox } from './index'
import { IContentItem } from '../index'
import { RootState } from '../../../index'
import { LISTS_HAVE_BLURBS, RELEASE_PHASE } from '../../../config'
import { hasTag, hasCategory, contentItemToTrack, getContentItemsFromRawList } from '../functions'

interface IProps {
  category: string

  additionalCategory?: string
  shouldSetCurrentPlaylist?: boolean
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
  shouldSetCurrentPlaylist = true,
  blurb,
  buttonText,
  children,
  excludeFromAll,
  currentFilter = 'all',
  filters: propsFilters = [],
  highlights,
  infoPopupText,
  infoPopupTitle,
  items: propsContentItems,
  linkTo,
  showCategoryOnContentBoxes = false,
  title,
}: IProps): ReactElement {
  const { storeContentItems, currentlyOpenPopUp } = useSelector((state: RootState) => ({
    storeContentItems: state.content.contentItems,
    currentlyOpenPopUp: state.popups.currentlyOpenPopUp,
  }))

  const dispatch = useDispatch()

  const [finalContentItems, setFinalContentItems] = useState<IContentItem[]>([])
  const [finalFilters, setFinalFilters] = useState<Array<{ tag: string, empty: boolean }>>([])

  useEffect(function filters() {
    const contentItems = (propsContentItems || storeContentItems).filter(item =>
      item.published && parseInt(item.releasePhase, 10) <= RELEASE_PHASE
    )

    if (!contentItems) return
    if (!contentItems.length) return

    let existingTags = contentItems.map(item => item.tags.split(',').map(tag => tag.trim()))
    // @ts-ignore
    existingTags = existingTags.flat()

    let filters = propsFilters.map(tag => ({
      tag,
      // @ts-ignore
      empty: !existingTags.includes(slugify(tag))
    }))

    filters = [{ tag: 'All', empty: false }].concat(filters)

    setFinalFilters(filters)

  }, [storeContentItems])

  useEffect(function itemsAndPlaylist() {
    let contentItems

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

      if (currentFilter && currentFilter !== 'all') {
        contentItems = contentItems.filter(item => hasTag(item, currentFilter))
        stickyContentItems = stickyContentItems.filter(item => hasTag(item, currentFilter))
      }

      else if (excludeFromAll) {
        contentItems = contentItems.filter(item => {
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

    contentItems = contentItems.filter((item: IContentItem) =>
      parseInt(item.releasePhase, 10) <= RELEASE_PHASE
    )

    setFinalContentItems(contentItems)

    setTimeout(function () {
      if (currentlyOpenPopUp) return

      let tracks = []

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
      { finalFilters.length > 1 && (
        <div className="main-content-filters clearfix">
          <h3>Select:</h3>
          { finalFilters.map(({ tag, empty }) => (
            <Link
              className={`
                main-content-filter
                ${ currentFilter === slugify(tag) ? 'active' : '' }
                ${ currentFilter === slugify(excludeFromAll) ? 'exclusive-filter' : '' }
                ${ empty ? 'empty-filter' : '' }
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
