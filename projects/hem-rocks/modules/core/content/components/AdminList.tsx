import React, { ReactElement, useEffect, useCallback, useState, SyntheticEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, } from 'react-router-dom'
import produce from 'immer'
import uuid from 'uuid'
import { isEmpty, noop, find, filter } from 'lodash'
import { slugify, titleCase } from 'voca'
import { ElectronOnly } from '../../../../../../lib/components'
import { PlayPauseButton } from '../../../../../../lib/packages/hem-buttons'
import { selectableCategories, adminApplyFilter, adminApplySearch, getTagsInCollection, getContentItemBySlug, setAdminSearchableField, toggleNeedsKeyArtFilter, requestReadItems, requestUpdateItems, IContentItem, categories, projects } from '../index'
import { RootState } from '../../../../index'
import { hasCategory, hasTag, modelize } from '../functions'
import { assetHostHostname } from '../../../../functions'
import { toggleShowUnpublishedFilter, toggleStickyFilter, setCurrentPage, requestCreateItems } from '../actions'

function AdminList(): ReactElement {
  const {
    adminFilterApplied,
    adminSearchableField,
    adminSearchApplied,
    allContentItems,
    contentItemsCount,
    currentProject,
    needsKeyArtFilter,
    page,
    pageContentItems,
    showUnpublishedFilter,
    stickyFilter,
    unpaginatedItemCount,
  } = useSelector((state: RootState) => ({
    adminFilterApplied: state.content.adminFilterApplied,
    adminSearchableField: state.content.adminSearchableField,
    adminSearchApplied: state.content.adminSearchApplied,
    allContentItems: state.content.contentItems,
    contentItemsCount: state.content.contentItems.length,
    currentProject: state.content.currentProject,
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

  const projectFilterOnChange = useCallback(
    function projectFilterOnChange(evt: SyntheticEvent<HTMLSelectElement>) {
      const item = getContentItemBySlug(allContentItems, 'setting-current-project')
      const updatedItem: IContentItem = produce(item, (draftItem) => {
        draftItem.description = evt.currentTarget.value
      })
      dispatch(requestUpdateItems([updatedItem]))
    }, [allContentItems],
  )

  const categoryFilterOnChange = useCallback(
    function categoryFilterOnChangeFn(evt: SyntheticEvent<HTMLSelectElement>) {
      dispatch(adminApplyFilter(evt.currentTarget.value))
    }, [],
  )

  const searchOnChange = useCallback(
    function categoryFilterOnChangeFn(evt: SyntheticEvent<HTMLInputElement | HTMLSelectElement>) {
      dispatch(adminApplySearch(evt.currentTarget.value))
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

  return (
    <ElectronOnly showMessage={true}>
      <div className="admin-list">
        <div className="admin-list-controls clearfix">
          <div className="admin-list-controls-select">
            <label htmlFor="select">
              Project:&nbsp;
              <PlayPauseButton
                playing={false}
                onClick={noop}
              />
            </label>
            <select
              className="custom-select"
              name="select"
              onChange={projectFilterOnChange}
              value={currentProject}
            >
              { projects.map(project => (
                <option
                  key={project}
                  value={project}
                >
                  { project }
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="admin-list-controls clearfix">
          <div className="admin-list-controls-select">
            <label htmlFor="select">
              Category:&nbsp;
            </label>
            <select
              className="custom-select"
              name="select"
              onChange={categoryFilterOnChange}
              value={adminFilterApplied}
            >
              <option value="all">All</option>
              { selectableCategories(categories, currentProject).map(category => (
                <option
                  key={category}
                  value={category}
                >
                  { titleCase(category).replace(/-/g, ' ') }
                </option>
              ))}
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
              <option value="property">Property:</option>
              <option value="title">Title:</option>
              <option value="audioFilename">Audio:</option>
              <option value="attribution">Attr:</option>
              <option value="secondaryAttribution">2nd Attr:</option>
              <option value="secondaryTitle">2nd Title:</option>
              <option value="slug">Slug</option>
              <option value="description">Desc</option>
            </select>
            { adminSearchableField === 'tags' && (
              <select
                className="custom-select admin-select-tag"
                onChange={searchOnChange}
                value={adminSearchApplied}
              >
                <option value="">All</option>
                { getTagsInCollection(filter(allContentItems, { project: currentProject })).map(tag => (
                  <option
                    key={tag}
                    value={tag}
                  >
                    { titleCase(tag).replace(/-/g, ' ').replace(/%26/g, '&') }
                  </option>
                )) }
              </select>
            )}
            { adminSearchableField !== 'tags' && (
              <input
                onChange={searchOnChange}
                placeholder={adminSearchApplied}
                type="text"
              />
            )}
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
                    <option value="category">Category</option>
                    <option value="tags">Tags</option>
                    <option value="id">Id</option>
                    <option value="date">Date</option>
                    <option value="tags">Order</option>
                    <option value="attribution">Attribution</option>
                    <option value="type">Type</option>
                  </select>
                </th>
              )}
              <th className="admin-list-column-actions">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            { pageContentItems.map((item: IContentItem) => (
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
                            <source src={assetHostHostname() + '/' + currentProject + '/content/tracks/' + item.audioFilename} type="audio/mpeg" />
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
                <td className="admin-list-column-field">
                  <div>
                    {(() => {
                      // @ts-ignore
                      return typeof interestingProperty === 'string' && item[interestingProperty].replace(/^, /, '')
                    })()}
                  </div>
                  { hasCategory(item, 'playlists') && (
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
                  )}
                  {(hasTag(item, 'albums') || hasTag(item, 'discs')) && item.attachments.split("\n").map(id => (
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
                <td className="admin-list-column-actions">
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        if (draftItem.releasePhase === '2') {
                          draftItem.releasePhase = '2'
                        }

                        else {
                          draftItem.releasePhase = '1'
                        }
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { item.releasePhase === '2' ? 'RP2' : 'RP1'}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        if (!hasTag(draftItem, 'not-playable')) {
                          draftItem.tags = draftItem.tags + ', not-playable'
                        }

                        else {
                          draftItem.tags = draftItem.tags.replace('not-playable', '')
                        }
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { hasTag(item, 'not-playable') ? 'Not Playable' : 'Playable'}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        if (draftItem.published) {
                          draftItem.published = false
                        }

                        else {
                          draftItem.published = true
                        }
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { item.published ? 'Unpublish' : 'Publish'}
                  </button>
                </td>
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
                  slug: slugify(input.value) + '-todo',
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
