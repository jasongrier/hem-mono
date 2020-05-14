import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ElectronOnly } from '../../../../../lib/components'
import { deleteItem, updateItem } from '../index'
import { RootState } from '../../../index'

function AdminList(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  return (
    <ElectronOnly showMessage={true}>
      <div className="admin-list">
        <div className="admin-list-controls">
          <div className="admin-list-controls-select-all">
            <label htmlFor="select-all">
              Select all
              <input
                name="select-all"
                type="checkbox"
              />
            </label>
          </div>
          <div className="admin-list-controls-select">
            <label htmlFor="select">
              <select name="select">
                <option value="">Sound Library</option>
                <option value="">Label</option>
                <option value="">Mixes</option>
                <option value="">Venue</option>
                <option value="">Software</option>
                <option value="">Merch</option>
              </select>
            </label>
          </div>
          <div className="admin-list-controls-search">
            <label htmlFor="search">
              <input type="text" name="search" placeholder="Tag, title, attribution..." />
            </label>
          </div>
        </div>
        <table>
          <thead>
            <th>
              <input type="checkbox"/>
            </th>
            <th>
              Name
            </th>
            <th>
              Date
            </th>
            <th>
              Actions
            </th>
          </thead>
          <tbody>
            { contentItems.map(item => (
              <tr>
                <td>
                  <input type="checkbox"/>
                </td>
                <td className="admin-list-content-item-title">
                  <Link to={item.slug}>{item.name}</Link>
                </td>
                <td className="admin-list-content-item-actions">
                  <Link to={item.slug}>Edit</Link>
                  <button onClick={() => {
                    dispatch(updateItem(item.slug, { published: !item.published }))
                  }}>
                    { item.published ? 'Unpublish' : 'Publish' }
                  </button>
                  <button onClick={() => {
                    const confirmation = confirm('Are you sure?')
                    if (!confirmation) return
                    dispatch(deleteItem(item.slug))
                  }}>
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
