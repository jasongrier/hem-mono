import React, { ReactElement, useEffect, useCallback, useState, SyntheticEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import produce from 'immer'
import { isEmpty, noop } from 'lodash'
import moment from 'moment'
import { ElectronOnly } from '../../../../../lib/components'
import { PlayPauseButton } from '../../../../../lib/packages/hem-buttons'
import { adminApplyFilter, requestDeleteItems, requestReadItems, requestUpdateItems, IContentItem } from '../index'
import { RootState } from '../../../index'
import { hasTag } from '../functions'

function AdminList(): ReactElement {
  const { adminFilterApplied, allContentItems } = useSelector((state: RootState) => ({
    adminFilterApplied: state.content.adminFilterApplied,
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  useEffect(function fetchItems() {
    dispatch(requestReadItems({ page: 1, size: 10000 }))
  }, [])

  const [search, setSearch] = useState('')

  const categoryFilterOnChange = useCallback(
    function categoryFilterOnChangeFn(evt: SyntheticEvent<HTMLSelectElement>) {
      dispatch(adminApplyFilter(evt.currentTarget.value))
    }, [],
  )

  const searchOnChange = useCallback(
    function categoryFilterOnChangeFn(evt: SyntheticEvent<HTMLInputElement>) {
      setSearch(evt.currentTarget.value)
    }, [],
  )

  let contentItems = ([] as IContentItem[]).concat(adminFilterApplied === 'all' ? allContentItems : allContentItems.filter(item => {
    return hasTag(item, adminFilterApplied)
  }))

  if (!isEmpty(search)) {
    contentItems = contentItems.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
      || item.tags.includes(search)
      || item.tags.includes(search.toLowerCase())
      || item.attribution.toLowerCase().includes(search.toLowerCase())
    )
  }

  contentItems.sort((a, b) => {
    // @ts-ignore
    return moment(b.date, 'DD.MM.YYYY') - moment(a.date, 'DD.MM.YYYY')
  })

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
              <option value="label">Label</option>
              <option value="merch">Merch</option>
              <option value="mixes">Mixes</option>
              <option value="playlist">Playlist</option>
              <option value="press">Press</option>
              <option value="sound-library">Sound Library</option>
              <option value="track">Track</option>
              <option value="tutorials">Tutorials</option>
              <option value="venue-archive">Venue Archive</option>
              <option value="venue-calendar">Venue Calendar</option>
              <option value="videos">Videos</option>
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
        <table>
          <thead>
            <tr>
              {/* <th className="admin-list-column-check">
                <input type="checkbox"/>
              </th> */}
              <th className="admin-list-column-title">
                Item
              </th>
              <th className="admin-list-column-date">
                Date
              </th>
              <th className="admin-list-column-check">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            { contentItems.map((item: IContentItem) => (
              <tr key={item.slug}>
                {/* <td className="admin-list-column-check">
                  <input type="checkbox"/>
                </td> */}
                <td className="admin-list-column-title">
                  <Link to={`/admin/edit/${item.slug}`}>{item.title}</Link>
                </td>
                <td className="admin-list-column-date">
                  { item.date }
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ElectronOnly>
  )
}

export default AdminList
