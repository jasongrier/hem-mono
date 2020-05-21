import React, { ReactElement, useState, SyntheticEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import produce from 'immer'
import { isEqual, startCase } from 'lodash'
import { ElectronOnly, ZoomTextarea } from '../../../../../lib/components'
import { IContentItem, fieldTypes, modelize, requestCreateItems, requestUpdateItems } from '../index'
import { RootState } from '../../../index'

interface IProps {
  create: boolean
  itemSlug?: string
}

function AdminItem({ create, itemSlug }: IProps): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const [originalItem, setOriginalItem] = useState<IContentItem>()
  const [workingItem, setWorkingItem] = useState<IContentItem>()
  const [canSave, setCanSave] = useState<boolean>(false)

  useEffect(function initItem() {
    if (!allContentItems.length) return
    if (originalItem) return
    if (workingItem) return

    let errorMessage

    if (!create && !itemSlug) {
      errorMessage = 'Sorry, something went wrong, there is no item slug given.'
    }

    let item

    if (!create && itemSlug) {
      item = allContentItems.find(item => item.slug === itemSlug)

      if (!item) {
        errorMessage = `Sorry, something went wrong, theres no item with the slug "${itemSlug}".`
      }
    }

    else if (create) {
      item = modelize({})
      setCanSave(true)
    }

    else {
      errorMessage = 'Sorry, something truly weird happened.'
    }

    if (errorMessage) {
      console.error(errorMessage)
      return
    }

    if (!item) {
      console.error('An unknown error has occurred.')
      return
    }

    setOriginalItem(item)
    setWorkingItem(item)
  }, [allContentItems])

  function onChange(fieldName, value) {
    setWorkingItem(produce(workingItem, (draftItem) => {
      draftItem[fieldName] = value
      setCanSave(!isEqual(draftItem, originalItem))
    }))
  }

  function onSaveClicked() {
    if (create) {
      dispatch(requestCreateItems([workingItem]))
    }

    else {
      dispatch(requestUpdateItems([{
        slug: itemSlug,
        update: workingItem,
      }]))
    }

    setOriginalItem(workingItem)
    setCanSave(false)
  }

  if (!workingItem) return (
    <header className="admin-item-header">
      <h2>Loading...</h2>
    </header>
  )

  const keys = Object.keys(workingItem)
  const preferredOrder = [
    'name',
  ]

  let orderedKeys = []
  for (const preferredKey of preferredOrder) {
    const keyIndex = keys.indexOf(preferredKey)

    if (keyIndex > -1) {
      orderedKeys.push(preferredKey)
      keys.splice(keyIndex)
    }
  }

  orderedKeys = orderedKeys.concat(keys)

  return (
    <ElectronOnly showMessage={true}>
      <header className="admin-item-header">
        <h2>{ originalItem.name }</h2>
        <button
          className="action-button save-item-button"
          disabled={!canSave}
          onClick={onSaveClicked}
        >
          Save
        </button>
      </header>
      <table className="admin-item">
        <tbody>
          { orderedKeys.map(fieldName => {
            if (fieldTypes[fieldName] === 'textarea') {
              return (
                <tr key={fieldName}>
                  <td>
                    <label htmlFor={fieldName}>{ startCase(fieldName) }</label>
                  </td>
                  <td>
                    <ZoomTextarea
                      name={fieldName}
                      onChange={(value) => onChange(fieldName, value)}
                      value={workingItem[fieldName]}
                    />
                  </td>
                </tr>
              )
            }

            else if (
              fieldTypes[fieldName] === 'text'
              || fieldTypes[fieldName] === 'number'
            ) {
              return (
                <tr key={fieldName}>
                  <td>
                    <label htmlFor={fieldName}>{ startCase(fieldName) }</label>
                  </td>
                  <td>
                    <input
                      name={fieldName}
                      onChange={(evt: SyntheticEvent<HTMLInputElement>) => onChange(fieldName, evt.currentTarget.value)}
                      type={fieldTypes[fieldName]}
                      value={workingItem[fieldName]}
                    />
                  </td>
                </tr>
              )
            }

            else if (
              fieldTypes[fieldName] === 'checkbox'
            ) {
              return (
                <tr key={fieldName}>
                  <td>
                    <label htmlFor={fieldName}>{ startCase(fieldName) }</label>
                  </td>
                  <td>
                    <input
                      name={fieldName}
                      onChange={(evt: SyntheticEvent<HTMLInputElement>) => onChange(fieldName, !workingItem[fieldName])}
                      type={fieldTypes[fieldName]}
                      checked={workingItem[fieldName]}
                    />
                  </td>
                </tr>
              )
            }

            else {
              return (
                <tr key={fieldName}>
                  <td>
                    ERR!
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </ElectronOnly>
  )
}

export default AdminItem
