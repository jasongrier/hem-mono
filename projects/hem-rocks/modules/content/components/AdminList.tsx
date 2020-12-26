import React, { ReactElement, useEffect, useCallback, useState, SyntheticEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import produce from 'immer'
import { isEmpty, noop, find, filter } from 'lodash'
import { slugify, titleCase } from 'voca'
import moment from 'moment'
import { ElectronOnly } from '../../../../../lib/components'
import { PlayPauseButton } from '../../../../../lib/packages/hem-buttons'
import { adminApplyFilter, adminApplySearch, setAdminSearchableField, toggleNeedsKeyArtFilter, requestDeleteItems, requestReadItems, requestUpdateItems, IContentItem } from '../index'
import { RootState } from '../../../index'
import { getContentItemBySlug, hasCategory, hasTag, modelize } from '../functions'
import { assetHostHostname } from '../../../functions'
import { toggleShowUnpublishedFilter, toggleStickyFilter, setCurrentPage, requestCreateItems } from '../actions'
import uuid from 'uuid'

function AdminList(): ReactElement {
  const {
    allContentItems,
    adminFilterApplied,
    adminSearchableField,
    adminSearchApplied,
    contentItemsCount,
    needsKeyArtFilter,
    page,
    pageContentItems,
    showUnpublishedFilter,
    stickyFilter,
    unpaginatedItemCount,
  } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
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
  const [collapsed, setCollapsed] = useState<boolean>(false)

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

  const collapsedLayoutOnChange = useCallback(
    function collapsedLayoutOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      setCollapsed(!collapsed)
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
              <option value="articles">Articles</option>
              <option value="artists">Artists</option>
              <option value="code">Code</option>
              <option value="faqs">FAQ's</option>
              <option value="editions">Editions</option>
              <option value="heroines">Heroines</option>
              <option value="home-features">Home Features</option>
              <option value="label">Label</option>
              <option value="merch">Merch</option>
              <option value="mix">Mixes</option>
              <option value="playlists">Playlists</option>
              <option value="press">Press</option>
              <option value="press-kits">Press Kits</option>
              <option value="recipes">Recipes</option>
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
              <option value="all">---</option>
              <option value="todos">Todo's</option>
            </select>
          </div>
          <div className="admin-list-controls-search">
            <select
              className="custom-select admin-select-searchable-field"
              onChange={evt => dispatch(setAdminSearchableField(evt.currentTarget.value))}
              value={adminSearchableField}
            >
              <option value="id">Id:</option>
              <option value="tags">Tag:</option>
              <option value="title">Title:</option>
              <option value="audioFilename">Audio:</option>
              <option value="attribution">Attr:</option>
              <option value="secondaryAttribution">2nd Attr:</option>
              <option value="secondaryTitle">2nd Title:</option>
              <option value="slug">Slug</option>
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
          <label htmlFor="collapsed-layout">
            Collapse layout:&nbsp;
            <input
              onChange={collapsedLayoutOnChange}
              name="collapsed-layout"
              type="checkbox"
              value={collapsed ? 'on' : 'off'}
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
              <th className="admin-list-column-check"></th>
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
                { collapsed && (
                  <td className="admin-list-column-thumbnail">
                    <Link to={`/admin/edit/${item.slug}`}>{ item.title }</Link><br />
                    <input
                      type="text"
                      value={item.slug}
                      onClick={(evt: any) => {
                        evt.target.select()
                      }}
                    />
                  </td>
                )}
                { !collapsed && (
                  <td className="admin-list-column-thumbnail">
                    <Link to={`/admin/edit/${item.slug}`}>
                      { hasCategory(item, 'assets')
                        ? item.audioFilename.replace('/Volumes/April_Kepner/Eva_Vollmer/Disorganised/', '')
                        : item.title
                      }
                    </Link>
                    <br />
                    <Link to={`/admin/edit/${item.slug}`}>
                      {/* { hasCategory(item, 'stock-photos') && (
                        <img src={`${assetHost}/berlin-stock-photos/content/images/jpg-web/${item.keyArt}`} />
                      )}
                      { !hasCategory(item, 'stock-photos')
                        && !hasCategory(item, 'assets')
                        && !hasCategory(item, 'lists')
                        && (
                          <img src={`${assetHost}/hem-rocks/content/images/key-art/${item.keyArt}`} />
                      )} */}
                      { hasCategory(item, 'tracks') && (
                        <>
                          <audio controls>
                            <source src={assetHostHostname() + '/hem-rocks/content/tracks/' + item.audioFilename} type="audio/mpeg" />
                          </audio>
                          <br/>
                          <small>{ item.slug }</small><br/>
                          <small>{ item.secondaryAttribution }</small>
                        </>
                      )}
                    </Link>
                    <br/>
                  </td>
                )}
                { hasCategory(item, 'playlists') && (
                  <td className="admin-list-column-field">
                    <div>
                      {(() => {
                        // @ts-ignore
                        return typeof interestingProperty === 'string' && item[interestingProperty].replace(/^, /, '')
                      })()}
                    </div>
                    <pre>
                      { item.attachments.split('\n').map(
                        id => {
                          const item = find(allContentItems, { id })
                          if (item) {
                            return item.title
                          }

                          else if (!isEmpty(id)) {
                            return 'NOT FOUND'
                          }
                        }
                      ).join('\n')}
                    </pre>
                    { (hasTag(item, 'albums') || hasTag(item, 'discs')) && item.attachments.split("\n").map(id => (
                      <div key={uuid()}>
                        {(() => {
                          const item = find(allContentItems, { id })

                          if (!item) return (
                            <div>Not Found: { id }</div>
                          )

                          return (
                            <div>
                              <Link to={`/admin/edit/${item.slug}`}>
                                { item.title }
                              </Link>
                              <br />
                              <audio controls>
                                <source src={assetHostHostname() + item.audioFilename} />
                              </audio>
                            </div>
                          )
                        })()}
                      </div>
                    ))}
                  </td>
                )}
                { collapsed && (
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
                  </td>
                )}
                {!collapsed && (
                  <td className="admin-list-column-actions">
                    {/* { (hasCategory(item, 'tracks') || hasTag(item, 'discs')) && (
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
                              draftItem.tags = draftItem.tags + ', ' + input.value
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
                        <form
                          className="inline-edit-form last-inline-edit-form"
                          onSubmit={(evt: SyntheticEvent<HTMLFormElement>) => {
                            evt.preventDefault()
                            const input = evt.currentTarget.querySelector('input[name="order"]')
                            if (!input) return
                            const updatedItem: IContentItem = produce(item, (draftItem) => {
                              // @ts-ignore
                              draftItem.order = input.value
                            })
                            dispatch(requestUpdateItems([updatedItem]))
                            // @ts-ignore
                            input.value = ''
                          }}
                        >
                          <label><span>Order:</span> <input type="text" name="order" placeholder={item.order} /></label>
                          <button type="submit">Submit</button>
                        </form>
                        <form
                          className="inline-edit-form last-inline-edit-form"
                          onSubmit={(evt: SyntheticEvent<HTMLFormElement>) => {
                            evt.preventDefault()
                            const input = evt.currentTarget.querySelector('input[name="audio-filename"]')
                            if (!input) return
                            const updatedItem: IContentItem = produce(item, (draftItem) => {
                              // @ts-ignore
                              draftItem.audioFilename = input.value
                            })
                            dispatch(requestUpdateItems([updatedItem]))
                            // @ts-ignore
                            input.value = ''
                          }}
                        >
                          <label><span>File:</span> <input type="text" name="audio-filename" placeholder={item.audioFilename} /></label>
                          <button type="submit">Submit</button>
                        </form>
                        <form
                          className="inline-edit-form last-inline-edit-form"
                          onSubmit={(evt: SyntheticEvent<HTMLFormElement>) => {
                            evt.preventDefault()
                            const input = evt.currentTarget.querySelector('input[name="key-art"]')
                            if (!input) return
                            const updatedItem: IContentItem = produce(item, (draftItem) => {
                              // @ts-ignore
                              draftItem.keyArt = input.value
                            })
                            dispatch(requestUpdateItems([updatedItem]))
                            // @ts-ignore
                            input.value = ''
                          }}
                        >
                          <label><span>Key Art:</span> <input type="text" name="key-art" placeholder={item.keyArt} /></label>
                          <button type="submit">Submit</button>
                        </form>
                      </>
                    )} */}
                    {/* { !hasCategory(item, 'assets') && (
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
                    )} */}
                    { !hasCategory(item, 'assets')
                      && !hasCategory(item, 'todos')
                      && (
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
                    { !hasCategory(item, 'assets')
                      && (
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
                    { hasCategory(item, 'tracks') && (
                      <button
                        style={{
                          opacity: item.secondaryAttribution === '' ? .2 : 1,
                          pointerEvents: item.secondaryAttribution === '' ? 'none' : 'all',
                          cursor: item.secondaryAttribution === '' ? 'auto' : 'pointer',
                        }}
                        className="action-button"
                        onClick={() => {
                          const updatedItem: IContentItem = produce(item, (draftItem) => {
                            draftItem.secondaryAttribution = ''
                          })
                          dispatch(requestUpdateItems([updatedItem]))
                        }}
                      >
                        Remove Album
                      </button>
                    )}
                    { hasCategory(item, 'todos')
                      && (
                        <button
                          style={hasTag(item, 'done-todo') ? {
                            backgroundColor: 'green',
                          } : {}}
                          className="action-button"
                          onClick={() => {
                            const updatedItem: IContentItem = produce(item, (draftItem) => {
                              if (hasTag(item, 'done-todo')) {
                                draftItem.tags = draftItem.tags.replace(', done-todo', '').replace('done-todo', '')
                              }

                              else {
                                draftItem.tags = draftItem.tags + ', done-todo'
                              }
                            })
                            dispatch(requestUpdateItems([updatedItem]))
                          }}
                        >
                          { hasTag(item, 'done-todo') ? '✓ Done' : 'Not Done' }
                        </button>
                    )}
                    { !hasCategory(item, 'assets')
                      && !hasCategory(item, 'lists')
                      && !hasCategory(item, 'todos')
                      && (
                        <button
                          style={hasTag(item, 'done-for-now') ? {
                            backgroundColor: 'green',
                          } : {}}
                          className="action-button"
                          onClick={() => {
                            const updatedItem: IContentItem = produce(item, (draftItem) => {
                              if (hasTag(item, 'done-for-now')) {
                                draftItem.tags = draftItem.tags.replace(', done-for-now', '').replace('done-for-now', '')
                              }

                              else {
                                draftItem.tags = draftItem.tags + ', done-for-now'
                              }
                            })
                            dispatch(requestUpdateItems([updatedItem]))
                          }}
                        >
                          { hasTag(item, 'done-for-now') ? '✓ Done' : 'Done' }
                        </button>
                    )}
                    { !hasCategory(item, 'assets')
                      && !hasCategory(item, 'lists')
                      && !hasCategory(item, 'todos')
                      && (
                        ['featured', 'rare', 'live', 'radio', 'sound-library', 'releases', 'delete-me', 'has-multiple-artists'].map(tag => (
                          <button
                            key={tag}
                            className="action-button"
                            onClick={() => {
                              const updatedItem: IContentItem = produce(item, (draftItem) => {
                                if (hasTag(item, tag)) {
                                  draftItem.tags = draftItem.tags.replace(', ' + tag, '').replace(tag, '')
                                }

                                else {
                                  draftItem.tags = draftItem.tags + ', ' + tag
                                }
                              })
                              dispatch(requestUpdateItems([updatedItem]))
                            }}
                          >
                            { hasTag(item, tag) ? '✓ ' + titleCase(tag.replace('-', '')) : titleCase(tag.replace('-', '')) }
                          </button>
                      ))
                    )}
                    { !hasCategory(item, 'assets')
                      && !hasCategory(item, 'lists')
                      && !hasCategory(item, 'todos')
                      && (
                        <>
                          <button
                            className="action-button"
                            onClick={() => {
                              const updatedItem: IContentItem = produce(item, (draftItem) => {
                                draftItem.secondaryAttribution = 'Lockdown Doodles'
                              })
                              dispatch(requestUpdateItems([updatedItem]))
                            }}
                          >
                            { item.secondaryAttribution === 'Lockdown Doodles' ? '✓ Doodles' : 'Doodles'}
                          </button>
                          <button
                            className="action-button"
                            onClick={() => {
                              const updatedItem: IContentItem = produce(item, (draftItem) => {
                                draftItem.secondaryAttribution = 'Heart Shaped Rock Sessions'
                              })
                              dispatch(requestUpdateItems([updatedItem]))
                            }}
                          >
                            { item.secondaryAttribution === 'Heart Shaped Rock Sessions' ? '✓ HSR Sessions' : 'HSR Sessions'}
                          </button>
                          <button
                            className="action-button"
                            onClick={() => {
                              const updatedItem: IContentItem = produce(item, (draftItem) => {
                                draftItem.secondaryAttribution = 'Sound Library Sessions'
                              })
                              dispatch(requestUpdateItems([updatedItem]))
                            }}
                          >
                            { item.secondaryAttribution === 'Sound Library Sessions' ? '✓ SL Sessions' : 'SL Sessions'}
                          </button>
                          <button
                            className="action-button"
                            onClick={() => {
                              const updatedItem: IContentItem = produce(item, (draftItem) => {
                                draftItem.secondaryAttribution = 'Dog Star Orchestra 2009'
                              })
                              dispatch(requestUpdateItems([updatedItem]))
                            }}
                          >
                            { item.secondaryAttribution === 'Dog Star Orchestra 2009' ? '✓ DSO 2009' : 'DSO 2009'}
                          </button>
                          <button
                            className="action-button"
                            onClick={() => {
                              const updatedItem: IContentItem = produce(item, (draftItem) => {
                                draftItem.secondaryAttribution = 'Dog Star Orchestra 2010'
                              })
                              dispatch(requestUpdateItems([updatedItem]))
                            }}
                          >
                            { item.secondaryAttribution === 'Dog Star Orchestra 2010' ? '✓ DSO 2010' : 'DSO 2010'}
                          </button>
                          <button
                            className="action-button"
                            onClick={() => {
                              const updatedItem: IContentItem = produce(item, (draftItem) => {
                                draftItem.secondaryAttribution = 'Linda Perhacs Live at SFAI'
                              })
                              dispatch(requestUpdateItems([updatedItem]))
                            }}
                          >
                            { item.secondaryAttribution === 'Linda Perhacs Live at SFAI' ? '✓ Perhacs SFAI' : 'Perhacs SFAI'}
                          </button>
                          <button
                            className="action-button"
                            onClick={() => {
                              const updatedItem: IContentItem = produce(item, (draftItem) => {
                                draftItem.secondaryAttribution = 'Linda Perhacs Live at SFAI'
                              })
                              dispatch(requestUpdateItems([updatedItem]))
                            }}
                          >
                            { item.secondaryAttribution === 'Linda Perhacs Live at SFAI' ? '✓ Perhacs SFAI' : 'Perhacs SFAI'}
                          </button>
                        </>
                      )
                    }
                    { !hasCategory(item, 'assets')
                      && !hasCategory(item, 'tracks')
                      && !hasCategory(item, 'lists')
                      && !hasCategory(item, 'todos')
                      && (
                        <button
                          className="action-button"
                          onClick={() => {
                            const updatedItem: IContentItem = produce(item, (draftItem) => {
                              draftItem.sticky = !draftItem.sticky
                            })
                            dispatch(requestUpdateItems([updatedItem]))
                          }}
                        >
                          { item.sticky ? '✓ Sticky' : 'Sticky' }
                        </button>
                    )}
                    { !hasCategory(item, 'assets')
                      && !hasCategory(item, 'tracks')
                      && !hasCategory(item, 'lists')
                      && !hasCategory(item, 'todos')
                      && (
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
                          { hasTag(item, 'best-of') ? '✓ Best' : 'Best' }
                        </button>
                    )}
                    { hasCategory(item, 'label')
                      && hasCategory(item, 'lists')
                      && !hasCategory(item, 'todos')
                      && (
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
                          { hasTag(item, 'label-page') ? '✓ Label page' : 'Label page' }
                        </button>
                    )}
                    { hasCategory(item, 'tracks')
                      && !hasCategory(item, 'todos')
                      && (
                        <button
                          className="action-button"
                          onClick={() => {
                            const updatedItem: IContentItem = produce(item, (draftItem) => {
                              if (hasTag(item, 'projects')) {
                                draftItem.tags = draftItem.tags.replace(', projects', '').replace('projects', '')
                              }

                              else {
                                draftItem.tags = draftItem.tags + ', projects'
                              }
                            })
                            dispatch(requestUpdateItems([updatedItem]))
                          }}
                        >
                          { hasTag(item, 'projects') ? '✓ Projects' : 'Projects' }
                        </button>
                    )}
                    { !hasCategory(item, 'assets')
                      && !hasCategory(item, 'lists')
                      && !hasCategory(item, 'todos')
                      && (
                        [
                          '20th-century',
                          'acousmatic',
                          'activism',
                          'bedroom-pop',
                          'documentary',
                          'electro-acoustic',
                          'experimental',
                          'installation',
                          'new-classical',
                          'non-cochlear',
                          'pop',
                          'sound-art',
                          'sessions',
                        ].map(tag => (
                          <button
                            key={tag}
                            className="action-button"
                            onClick={() => {
                              const updatedItem: IContentItem = produce(item, (draftItem) => {
                                if (hasTag(item, tag)) {
                                  draftItem.tags = draftItem.tags.replace(', ' + tag, '').replace(tag, '')
                                }

                                else {
                                  draftItem.tags = draftItem.tags + ', ' + tag
                                }
                              })
                              dispatch(requestUpdateItems([updatedItem]))
                            }}
                          >
                            { hasTag(item, tag) ? '✓ ' + titleCase(tag.replace('-', '')) : titleCase(tag.replace('-', '')) }
                          </button>
                      ))
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        { adminFilterApplied === 'todos' && (
          <div>
            <form
              className="inline-edit-form first-inline-edit-form"
              onSubmit={(evt: SyntheticEvent<HTMLFormElement>) => {
                evt.preventDefault()
                const input = evt.currentTarget.querySelector('input[name="title"]')
                if (!input) return
                const item: IContentItem = modelize({
                  id: uuid(),
                  // @ts-ignore
                  title: input.value,
                  // @ts-ignore
                  slug: slugify(input.value),
                  published: true,
                  date: 'January 2021',
                  category: 'todos',
                } as Partial<IContentItem>)
                dispatch(requestCreateItems([item]))
                // @ts-ignore
                input.value = ''
              }}
            >
              <label><span>New Do:</span> <input type="text" name="title" /></label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        <div>
          <button onClick={() => dispatch(setCurrentPage(page - 1))}>&lt;&lt;</button>&nbsp;&nbsp;
          { page }&nbsp;&nbsp;
          <button onClick={() => dispatch(setCurrentPage(page + 1))}>&gt;&gt;</button>
        </div>
      </div>
    </ElectronOnly>
  )
}

export default AdminList
