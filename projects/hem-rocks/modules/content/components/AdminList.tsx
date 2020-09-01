import React, { ReactElement, useEffect, useCallback, useState, SyntheticEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import produce from 'immer'
import { isEmpty, noop, first } from 'lodash'
import { titleCase } from 'voca'
import moment from 'moment'
import { ElectronOnly } from '../../../../../lib/components'
import { PlayPauseButton } from '../../../../../lib/packages/hem-buttons'
import { adminApplyFilter, adminApplySearch, toggleNeedsKeyArtFilter, requestDeleteItems, requestReadItems, requestUpdateItems, IContentItem } from '../index'
import { RootState } from '../../../index'
import { hasCategory, hasTag } from '../functions'
import { assetHostHostname } from '../../../functions'
import { toggleShowUnpublishedFilter, toggleStickyFilter } from '../actions'

function AdminList(): ReactElement {
  const { adminFilterApplied, adminSearchApplied, allContentItems, needsKeyArtFilter, showUnpublishedFilter, stickyFilter } = useSelector((state: RootState) => ({
    adminFilterApplied: state.content.adminFilterApplied,
    adminSearchApplied: state.content.adminSearchApplied,
    allContentItems: state.content.contentItems,
    needsKeyArtFilter: state.content.needsKeyArtFilter,
    showUnpublishedFilter: state.content.showUnpublishedFilter,
    stickyFilter: state.content.stickyFilter,
  }))

  const dispatch = useDispatch()

  useEffect(function fetchItems() {
    dispatch(requestReadItems())
  }, [])

  const categoryFilterOnChange = useCallback(
    function categoryFilterOnChangeFn(evt: SyntheticEvent<HTMLSelectElement>) {
      dispatch(adminApplyFilter(evt.currentTarget.value))
    }, [],
  )

  const searchOnChange = useCallback(
    function categoryFilterOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      dispatch(adminApplySearch(evt.currentTarget.value))
    }, [],
  )

  const needsPhotosOnChange = useCallback(
    function needsPhotosOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      dispatch(toggleNeedsKeyArtFilter())
    }, [],
  )

  const hideUnpublishedOnChange = useCallback(
    function hideUnpublishedOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      dispatch(toggleShowUnpublishedFilter())
    }, [],
  )
  
  const needsStickyOnChange = useCallback(
    function needsStickyOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      dispatch(toggleStickyFilter())
    }, [],
  )

  let contentItems = ([] as IContentItem[]).concat(adminFilterApplied === 'all' ? allContentItems : allContentItems.filter(item => {
    if (adminFilterApplied === 'home-feature') {
      return hasTag(item, adminFilterApplied)
    }

    return hasCategory(item, adminFilterApplied)
  }))

  if (!isEmpty(adminSearchApplied)) {
    contentItems = contentItems.filter(item =>
      item.title.toLowerCase().includes(adminSearchApplied.toLowerCase())
      || item.tags.includes(adminSearchApplied)
      || item.tags.includes(adminSearchApplied.toLowerCase())
      || item.attribution.toLowerCase().includes(adminSearchApplied.toLowerCase())
    )
  }

  if (needsKeyArtFilter) {
    contentItems = contentItems.filter(item => isEmpty(item.keyArt))
  }

  if (!showUnpublishedFilter) {
    contentItems = contentItems.filter(item => item.published)
  }
  
  if (stickyFilter) {
    contentItems = contentItems.filter(item => item.sticky)
  }

  contentItems.sort((a, b) => {
    if (adminFilterApplied === 'sound-library') {
      return parseInt(a.order, 10) - parseInt(b.order, 10)
    }
    
    else {
      // @ts-ignore
      return moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY')
    }
  })

  const assetHost = assetHostHostname()

  return (
    <ElectronOnly showMessage={true}>
      <div className="admin-list">
        <div className="admin-list-controls clearfix">
          <div className="admin-list-controls-select">
            <label htmlFor="select">
              Category:&nbsp;
              <PlayPauseButton playing={false} onClick={noop} />
            </label>
            <select
              name="select"
              onChange={categoryFilterOnChange}
              value={adminFilterApplied}
            >
              <option value="all">All</option>
              <option value="apps">Apps</option>
              <option value="blog">Blog</option>
              <option value="code">Code</option>
              <option value="faqs">FAQ's</option>
              <option value="label">Label</option>
              <option value="merch">Merch</option>
              <option value="mix">Mixes</option>
              <option value="press">Press</option>
              <option value="press-kits">Press Kits</option>
              <option value="sound-library">Sound Library</option>
              <option value="tracks">Tracks</option>
              <option value="tutorial">Tutorials</option>
              <option value="user-guides">User Guides</option>
              <option value="venue-archive">Venue Archive</option>
              <option value="venue-calendar">Venue Calendar</option>
              <option value="venue-merch">Venue Merch</option>
              <option value="video">Videos</option>
              <option value="all">---</option>
              <option value="lists">Lists</option>
              <option value="stock-photos">Berlin Stock Photos</option>
            </select>
          </div>
          <div className="admin-list-controls-search">
            <label htmlFor="search">
              Search:&nbsp;
            </label>
            <input
              onChange={searchOnChange}
              placeholder="Tag, title, attribution..."
              type="text"
            />
          </div>
        </div>
        <div className="admin-list-controls clearfix">
          <label htmlFor="hide-unpublished">
            Show unpublished:&nbsp;
            <input
              onChange={hideUnpublishedOnChange}
              name="hide-unpublished"
              type="checkbox"
              value={showUnpublishedFilter ? 'on' : 'off'}
            />
          </label>
          <label htmlFor="needs-photos">
            Needs key art:&nbsp;
            <input
              onChange={needsPhotosOnChange}
              name="needs-photos"
              type="checkbox"
              value={needsKeyArtFilter ? 'on' : 'off'}
            />
          </label>
          <label htmlFor="needs-sticky">
            Show sticky only:&nbsp;
            <input
              onChange={needsStickyOnChange}
              name="needs-sticky"
              type="checkbox"
              value={stickyFilter ? 'on' : 'off'}
            />
          </label>
        </div>
        <div className="admin-list-stats">
          Selected Items: <strong>{ contentItems.length }</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
          Total Items: <strong>{ allContentItems.length }</strong>
        </div>
        <table>
          <thead>
            <tr>
              <th className="admin-list-column-thumbnail">
                Item
              </th>
              {/* <th className="admin-list-column-title">
              </th> */}
              <th className="admin-list-column-category">
                Tags
              </th>
              <th className="admin-list-column-order">
                Order
              </th>
              {/* <th className="admin-list-column-date">
                Date
              </th> */}
              <th className="admin-list-column-check">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            { contentItems.map((item: IContentItem) => ( /* parseInt(item.title, 10) > 511 && */ (
              <tr key={item.slug}>
                <td className="admin-list-column-thumbnail">
                  {item.title}<br />
                  <Link to={`/admin/edit/${item.slug}`}>
                    { hasCategory(item, 'stock-photos') && (
                      <img src={`${assetHost}/berlin-stock-photos/content/images/jpg-web/${item.keyArt}`} />
                    )}
                    { !hasCategory(item, 'stock-photos') && (
                      <img src={`${assetHost}/hem-rocks/content/images/key-art/${item.keyArt}`} />
                    )}
                  </Link>
                </td>
                {/* <td className="admin-list-column-title">
                  <Link to={`/admin/edit/${item.slug}`}>{item.title}</Link>
                </td> */}
                <td className="admin-list-column-category">
                  { titleCase(item.tags.replace(/-/g, ' ').replace(/,/g, ', ')) }
                </td>
                <td className="admin-list-column-order">
                  { item.order || '-' }
                </td>
                {/* <td className="admin-list-column-date">
                  { item.date }
                </td> */}
                <td className="admin-list-column-actions">
                  <button
                    className="action-button"
                    onClick={() => {
                      const confirmation = confirm('Are you sure?')
                      if (!confirmation) return
                      dispatch(requestDeleteItems([item.slug]))
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        draftItem.published = !draftItem.published
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { item.published ? 'Unpublish' : 'Publish' }
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        draftItem.sticky = !draftItem.sticky
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { item.sticky ? 'Unsticky' : 'Sticky' }
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        if (hasTag(item, 'best-of')) {
                          draftItem.tags = draftItem.tags.replace(', best-of', '')
                        }

                        else {
                          draftItem.tags = draftItem.tags + ', best-of'
                        }
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { hasTag(item, 'best-of') ? 'Un-best' : 'Best' }
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </ElectronOnly>
  )
}

export default AdminList
