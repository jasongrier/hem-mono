import React, { ReactElement, useState, useCallback, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import produce from 'immer'
import uuid from 'uuid/v1'
import { slugify } from 'voca'
import { modelize, IContentItem, hasCategory, uniqueSlug, requestCreateItems } from '../index'
import { RootState } from '../../../index'

interface IProps {
  onSubmit: () => void
}

function newWorkingItem(oldWorkingItem?: Partial<IContentItem>) {
  return modelize({
    id: uuid(),
    category: 'program',
    tags: oldWorkingItem ? oldWorkingItem.tags : 'wish-list',
    title: oldWorkingItem ? oldWorkingItem.title : '',
    type: oldWorkingItem ? oldWorkingItem.type : 'Tracks',
    published: true,
    order: '0',
  })
}

function AdminProgramNewItemForm({ onSubmit }: IProps): ReactElement {
  const { allContentItems, programItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    programItems: state.content.contentItems.filter(item =>
      hasCategory(item, 'program')
      && item.published
    ),
  }))

  const dispatch = useDispatch()

  const [newItemFormOpen, setNewItemFormOpen] = useState<boolean>(true)
  const [workingNewItem, setWorkingNewItem] = useState<IContentItem>(newWorkingItem())

  const onNewItemFieldChange = useCallback(
    function onNewItemFieldChangeFn(fieldName: string, value: string) {
      setWorkingNewItem(produce(workingNewItem, (draftItem: any) => {
        draftItem[fieldName] = value
      }))
    }, [workingNewItem],
  )

  const onNewItemFormSubmit = useCallback(
    function onNewItemFormSubmitFn(evt: SyntheticEvent<HTMLFormElement>) {
      evt.preventDefault()

      const payloadItem = Object.assign({}, workingNewItem)

      payloadItem.slug = uniqueSlug(slugify(payloadItem.title), allContentItems)

      onSubmit()
      dispatch(requestCreateItems([payloadItem]))
      setWorkingNewItem(newWorkingItem())
    }, [workingNewItem, allContentItems],
  )

  return (
    <div className={`
      admin-program-box admin-program-items-new
      ${newItemFormOpen ? 'admin-program-items-new-open' : ''}
    `}>
      <form onSubmit={onNewItemFormSubmit}>
        <div>
          <label>Name:</label>
          <input
            onChange={(evt: SyntheticEvent<HTMLInputElement>) => onNewItemFieldChange('title', evt.currentTarget.value)}
            placeholder="Name"
            type="text"
          />
        </div>
        <div>
          <label>Type:</label>
          <select
            className="custom-select"
            onChange={(evt: SyntheticEvent<HTMLSelectElement>) => onNewItemFieldChange('type', evt.currentTarget.value)}
          >
            <option value="Tracks">Tracks</option>
            <option value="Apps">Apps</option>
            <option value="Articles">Articles</option>
            <option value="Editions">Editions</option>
            <option value="Mixes">Mixes</option>
            <option value="Sound Library">Sound Library</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select
            className="custom-select"
            onChange={(evt: SyntheticEvent<HTMLSelectElement>) => onNewItemFieldChange('tags', evt.currentTarget.value)}
          >
            <option value="wish-list">Wish List</option>
            <option value="invited">Invited</option>
            <option value="send-invite-soon">Send Invite Soon</option>
            <option value="needs-permission">Needs Permission</option>
            <option value="needs-production">Needs Production</option>
            <option value="available">Available</option>
          </select>
        </div>
        <div>
          <button
            className="action-button"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminProgramNewItemForm

