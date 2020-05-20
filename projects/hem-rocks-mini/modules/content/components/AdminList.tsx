import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { noop } from 'lodash'
import { ElectronOnly } from '../../../../../lib/components'
import { PlayPauseButton } from '../../../../../lib/packages/hem-buttons'
import { requestDeleteItems, requestReadItems, requestUpdateItems } from '../index'
import { RootState } from '../../../index'

function AdminList(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  useEffect(function fetchItems() {
    dispatch(requestReadItems({ page: 1, size: 10000 }))
  }, [])

  return (
    <ElectronOnly showMessage={true}>
      <div className="admin-list">
        <div className="admin-list-controls clearfix">
          <div className="admin-list-controls-select">
            <label htmlFor="select">
              Category:&nbsp;
              <PlayPauseButton playing={false} onClick={noop} />
            </label>
            <select name="select">
              <option value="">All</option>
              <option value="">Sound Library</option>
              <option value="">Label</option>
              <option value="">Mixes</option>
              <option value="">Venue</option>
              <option value="">Software</option>
              <option value="">Merch</option>
            </select>
          </div>
          <div className="admin-list-controls-search">
            <label htmlFor="search">
              Search:&nbsp;
            </label>
            <input type="text" name="search" placeholder="Tag, title, attribution..." />
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
            { contentItems.map(item => (
              <tr>
                {/* <td className="admin-list-column-check">
                  <input type="checkbox"/>
                </td> */}
                <td className="admin-list-column-title">
                  <Link to={item.slug}>{item.name}</Link>
                </td>
                <td className="admin-list-column-date">
                  { item.date }
                </td>
                <td className="admin-list-column-actions">
                  <button
                    className="action-button"
                    onClick={() => {
                      dispatch(requestUpdateItems([{
                        slug: item.slug,
                        update: { published: !item.published },
                      }]))
                    }}
                  >
                    { item.published ? 'Unpublish' : 'Publish' }
                  </button>
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
