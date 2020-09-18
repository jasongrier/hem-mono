import React, { ReactElement, useEffect, useCallback, useState, SyntheticEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import produce from 'immer'
import { isEmpty, noop, find, filter } from 'lodash'
import { slugify } from 'voca'
import moment from 'moment'
import { ElectronOnly } from '../../../../../lib/components'
import { PlayPauseButton } from '../../../../../lib/packages/hem-buttons'
import { adminApplyFilter, adminApplySearch, setAdminSearchableField, toggleNeedsKeyArtFilter, requestDeleteItems, requestReadItems, requestUpdateItems, IContentItem } from '../index'
import { RootState } from '../../../index'
import { hasCategory, hasTag } from '../functions'
import { assetHostHostname } from '../../../functions'
import { toggleShowUnpublishedFilter, toggleStickyFilter, setCurrentPage } from '../actions'

function AdminList(): ReactElement {
  const { 
    adminFilterApplied, 
    adminSearchableField, 
    adminSearchApplied,
    contentItemsCount, 
    needsKeyArtFilter, 
    page, 
    pageContentItems, 
    showUnpublishedFilter, 
    stickyFilter, 
    unpaginatedItemCount
  } = useSelector((state: RootState) => ({
    adminFilterApplied: state.content.adminFilterApplied,
    adminSearchableField: state.content.adminSearchableField,
    adminSearchApplied: state.content.adminSearchApplied,
    contentItemsCount: state.content.contentItems.length,
    needsKeyArtFilter: state.content.needsKeyArtFilter,
    page: state.content.page,
    pageContentItems: state.content.pageContentItems,
    showUnpublishedFilter: state.content.showUnpublishedFilter || state.content.adminFilterApplied === 'assets',
    stickyFilter: state.content.stickyFilter,
    unpaginatedItemCount: state.content.unpaginatedItemCount,
  }))

  const dispatch = useDispatch()

  useEffect(function fetchItems() {
    dispatch(requestReadItems())
  }, [])

  const [selectedItems, setSelectedItems] = useState<any>({})
  const [interestingProperty, setInterestingProperty] = useState<keyof IContentItem>('tags')

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

  function massTagSave(contentItems: IContentItem[]) {
    const input = document.getElementById('mass-tag-input')

    if (!input) return

    const selectedIds: string[] = []

    for (const id in selectedItems) {
      if (selectedItems[id] === true) {
        selectedIds.push(id)
      }
    }

    if (!selectedIds.length) return

    // @ts-ignore
    if (!input.value.length) return

    for (const id of selectedIds) {
      const checkedItem = find(contentItems, { id })

      if (!checkedItem) continue

      const newItem = Object.assign({}, checkedItem)

      // @ts-ignore
      newItem.tags = (newItem.tags + ', ' + input.value).replace(/^, /, '')
      dispatch(requestUpdateItems([newItem]))
    }

    // @ts-ignore
    input.value = ''
    setSelectedItems([])
  }

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
              className="custom-select"
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
              <option value="reminders">Reminders</option>
              <option value="sound-library">Sound Library</option>
              <option value="tracks">Tracks</option>
              <option value="tutorial">Tutorials</option>
              <option value="user-guides">User Guides</option>
              <option value="venue-archive">Venue Archive</option>
              <option value="venue-calendar">Venue Calendar</option>
              <option value="venue-merch">Venue Merch</option>
              <option value="video">Videos</option>
              <option value="lists">Lists</option>
              <option value="all">---</option>
              <option value="stock-photos">Berlin Stock Photos</option>
              <option value="all">---</option>
              <option value="assets">Assets on "April Kepner"</option>
              <option value="assets-vollmer">Assets on "Eva Vollmer"</option>
            </select>
          </div>
          <div className="admin-list-controls-search">
            <select 
              className="custom-select admin-select-searchable-field"
              onChange={evt => dispatch(setAdminSearchableField(evt.currentTarget.value))}
              value={adminSearchableField}
            >
              <option value="tags">Tag:</option>
              <option value="title">Title:</option>
              <option value="audioFilename">Audio:</option>
              <option value="attribution">Attr:</option>
              <option value="secondaryAttribution">2nd Attr:</option>
            </select>
            <input
              onChange={searchOnChange}
              placeholder={adminSearchApplied}
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
          Filtered items: <strong>{ unpaginatedItemCount }</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
          Total items: <strong>{ contentItemsCount }</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
          <button 
            disabled={ page === 1 }
            onClick={() => dispatch(setCurrentPage(page - 1))}
          >
            &lt;&lt;
          </button>
          &nbsp;&nbsp;
          { page }&nbsp;&nbsp;
          <button onClick={() => dispatch(setCurrentPage(page + 1))}>&gt;&gt;</button>
        </div>
        <div className="admin-list-controls clearfix">
          <div className="admin-list-controls-mass-tag">
            <form onSubmit={evt => {
              evt.preventDefault()
              massTagSave(pageContentItems)
            }}>
              <label htmlFor="mass-tag-input">
                Mass tag:
              </label>
              <input
                id="mass-tag-input"
                type="text"
              />
              <button
                className="action-button"
                onClick={evt => {
                  evt.preventDefault()
                  massTagSave(pageContentItems)
                }}
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th className="admin-list-column-check">

              </th>
              <th className="admin-list-column-thumbnail">
                Item
              </th>
              { adminFilterApplied !== 'tracks' && (
                <th className="admin-list-column-category">
                  <select onChange={(evt: SyntheticEvent<HTMLSelectElement>) => {
                    setInterestingProperty(evt.currentTarget.value as keyof IContentItem)
                  }}>
                    <option value="tags">Tags</option>
                    <option value="id">Id</option>
                    <option value="date">Date</option>
                    <option value="tags">Order</option>
                    <option value="attribution">Attribution</option>
                  </select>
                </th>
              )}
              <th className="admin-list-column-actions">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            { pageContentItems.map((item: IContentItem) => ( /* parseInt(item.title, 10) > 511 && */
              <tr key={item.id}>
                <td className="admin-list-column-check">
                  <button
                    className={`
                      action-button
                      small-action-button
                      ${ selectedItems[item.id] ? 'small-action-button-active' : '' }
                    `}
                    onClick={() => {
                      const newSelectedItems: any = Object.assign({}, selectedItems)

                      if (newSelectedItems[item.id]) {
                        newSelectedItems[item.id] = false
                      }

                      else {
                        newSelectedItems[item.id] = true
                      }

                      setSelectedItems(newSelectedItems)
                    }}
                  />
                </td>
                <td className="admin-list-column-thumbnail">
                  <Link to={`/admin/edit/${item.slug}`}>
                    { hasCategory(item, 'assets')
                      ? item.audioFilename.replace('/Volumes/April_Kepner/Eva_Vollmer/Disorganised/', '')
                      : item.title
                    }
                  </Link>
                  <br />
                  <Link to={`/admin/edit/${item.slug}`}>
                    { hasCategory(item, 'stock-photos') && (
                      <img src={`${assetHost}/berlin-stock-photos/content/images/jpg-web/${item.keyArt}`} />
                    )}
                    { !hasCategory(item, 'stock-photos') 
                      && !hasCategory(item, 'assets') 
                      && !hasCategory(item, 'tracks') 
                      && (
                        <img src={`${assetHost}/hem-rocks/content/images/key-art/${item.keyArt}`} />
                    )}
                    { hasCategory(item, 'tracks') && (
                      <>
                        <audio controls>
                          {/* <source src={assetHostHostname() + '/hem-rocks/content/tracks/' + item.audioFilename} type="audio/mpeg" /> */}
                          <source src={assetHostHostname() + item.audioFilename} />
                        </audio>
                        <br/>
                        <small>{ item.audioFilename }</small>
                      </>
                    )}
                  </Link>
                  <br/>
                  {/* <small>{ item.audioFilename }</small> */}
                </td>
                { !hasCategory(item, 'tracks') && (
                  <td className="admin-list-column-field">
                    {(() => {
                      // @ts-ignore
                      return typeof interestingProperty === 'string' && item[interestingProperty].replace(/^, /, '')
                    })()}
                  </td>
                )}
                <td className="admin-list-column-actions">
                  { hasCategory(item, 'tracks') && (
                    <>
                      <form 
                        className="inline-edit-form first-inline-edit-form"
                        onSubmit={(evt: SyntheticEvent<HTMLFormElement>) => {
                          evt.preventDefault()
                          const input = evt.currentTarget.querySelector('input[name="title"]')
                          if (!input) return
                          const updatedItem: IContentItem = produce(item, (draftItem) => {
                            // @ts-ignore
                            draftItem.title = input.value
                            // @ts-ignore
                            draftItem.slug = slugify(input.value)
                          })
                          dispatch(requestUpdateItems([updatedItem]))
                          // @ts-ignore
                          input.value = ''
                        }}
                      >
                        <label><span>Title:</span> <input type="text" name="title" placeholder={item.title} /></label>
                        <button type="submit">Submit</button>
                      </form>
                      <form 
                        className="inline-edit-form"
                        onSubmit={(evt: SyntheticEvent<HTMLFormElement>) => {
                          evt.preventDefault()
                          const input = evt.currentTarget.querySelector('input[name="tags"]')
                          if (!input) return
                          const updatedItem: IContentItem = produce(item, (draftItem) => {
                            // @ts-ignore
                            draftItem.tags = input.value
                          })
                          dispatch(requestUpdateItems([updatedItem]))
                          // @ts-ignore
                          input.value = ''
                        }}
                      >
                        <label><span>Tags:</span> <input type="text" name="tags" placeholder={item.tags.replace(/^, /, '')} /></label>
                        <button type="submit">Submit</button>
                      </form>
                      <form 
                        className="inline-edit-form last-inline-edit-form"
                        onSubmit={(evt: SyntheticEvent<HTMLFormElement>) => {
                          evt.preventDefault()
                          const input = evt.currentTarget.querySelector('input[name="attribution"]')
                          if (!input) return
                          const updatedItem: IContentItem = produce(item, (draftItem) => {
                            // @ts-ignore
                            draftItem.attribution = input.value
                          })
                          dispatch(requestUpdateItems([updatedItem]))
                          // @ts-ignore
                          input.value = ''
                        }}
                      >
                        <label><span>Artist:</span> <input type="text" name="attribution" placeholder={item.attribution} /></label>
                        <button type="submit">Submit</button>
                      </form>
                      <form 
                        className="inline-edit-form"
                        onSubmit={(evt: SyntheticEvent<HTMLFormElement>) => {
                          evt.preventDefault()
                          const input = evt.currentTarget.querySelector('input[name="secondary-attribution"]')
                          if (!input) return
                          const updatedItem: IContentItem = produce(item, (draftItem) => {
                            // @ts-ignore
                            draftItem.secondaryAttribution = input.value
                          })
                          dispatch(requestUpdateItems([updatedItem]))
                          // @ts-ignore
                          input.value = ''
                        }}
                      >
                        <label><span>Album:</span> <input type="text" name="secondary-attribution" placeholder={item.secondaryAttribution} /></label>
                        <button type="submit">Submit</button>
                      </form>
                      <form 
                        className="inline-edit-form last-inline-edit-form"
                        onSubmit={(evt: SyntheticEvent<HTMLFormElement>) => {
                          evt.preventDefault()
                          const input = evt.currentTarget.querySelector('input[name="slug"]')
                          if (!input) return
                          const updatedItem: IContentItem = produce(item, (draftItem) => {
                            // @ts-ignore
                            draftItem.slug = input.value
                          })
                          dispatch(requestUpdateItems([updatedItem]))
                          // @ts-ignore
                          input.value = ''
                        }}
                      >
                        <label><span>Slug:</span> <input type="text" name="slug" placeholder={item.slug} /></label>
                        <button type="submit">Submit</button>
                      </form>
                    </>
                  )}
                  { !hasCategory(item, 'assets') && !hasCategory(item, 'tracks') && (
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
                  )}
                  { !hasCategory(item, 'assets') && (
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
                  )}
                  { !hasCategory(item, 'assets') && (
                    <button
                      className="action-button"
                      onClick={() => {
                        const updatedItem: IContentItem = produce(item, (draftItem) => {
                          if (hasTag(item, 'label-page')) {
                            draftItem.tags = draftItem.tags.replace(', label-page', '').replace('label-page', '')
                          }

                          else {
                            draftItem.tags = draftItem.tags + ', label-page'
                          }
                        })
                        dispatch(requestUpdateItems([updatedItem]))
                      }}
                    >
                      { hasTag(item, 'label-page') ? 'Un-label page' : 'Label Page' }
                    </button>
                  )}
                  { !hasCategory(item, 'assets') && !hasCategory(item, 'tracks') && (
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
                  )}
                  { !hasCategory(item, 'assets') && !hasCategory(item, 'tracks') && (
                    <button
                      className="action-button"
                      onClick={() => {
                        const updatedItem: IContentItem = produce(item, (draftItem) => {
                          if (hasTag(item, 'best-of')) {
                            draftItem.tags = draftItem.tags.replace(', best-of', '').replace('best-of', '')
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
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ElectronOnly>
  )
}

export default AdminList
