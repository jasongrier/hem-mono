import React, { ReactElement, useState, SyntheticEvent, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import produce from 'immer'
import { isEqual, startCase } from 'lodash'
import { slugify } from 'voca'
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

  const history = useHistory()
  const location = useLocation()

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

  function onChange(fieldName: string, value: string) {
    setWorkingItem(produce(workingItem, (draftItem: any) => {
      draftItem[fieldName] = value
      setCanSave(!isEqual(draftItem, originalItem))
    }))
  }

  const onSubmit = useCallback(
    function onSubmitFn(evt: SyntheticEvent<HTMLFormElement>) {
      evt.preventDefault()

      if (!workingItem) return

      const payloadItem = Object.assign({}, workingItem)
      payloadItem.slug = slugify(payloadItem.name)

      if (create) {
        dispatch(requestCreateItems([payloadItem]))
        history.push('/admin/list')
      }

      else {
        dispatch(requestUpdateItems([payloadItem]))
      }

      setOriginalItem(workingItem)
      setCanSave(false)
    }, [workingItem],
  )

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
      keys.splice(keyIndex, 1)
    }
  }

  orderedKeys = orderedKeys.concat(keys)

  return (
    <ElectronOnly showMessage={true}>
      <form onSubmit={onSubmit}>
        <header className="admin-item-header">
          <h2>{ originalItem?.name }</h2>
          <button
            className="action-button save-item-button"
            disabled={!canSave}
            type="submit"
          >
            Save
          </button>
        </header>
        <table className="admin-item">
          <tbody>
            { orderedKeys.map(fieldName => {
              if (fieldName === 'slug') return
              if (fieldName === 'userSuggestedPrice') return

              if ((fieldTypes as any)[fieldName] === 'textarea') {
                return (
                  <tr key={fieldName}>
                    <td>
                      <label htmlFor={fieldName}>{ startCase(fieldName) }</label>
                    </td>
                    <td>
                      <ZoomTextarea
                        name={fieldName}
                        onChange={(value) => onChange(fieldName, value)}
                        value={(workingItem as any)[fieldName]}
                      />
                    </td>
                  </tr>
                )
              }

              else if (
                (fieldTypes as any)[fieldName] === 'text'
                || (fieldTypes as any)[fieldName] === 'number'
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
                        type={(fieldTypes as any)[fieldName]}
                        value={(workingItem as any)[fieldName]}
                        required={(
                          fieldName === 'name'
                          || fieldName === 'date'
                        )}
                      />
                    </td>
                  </tr>
                )
              }

              else if ((fieldTypes as any)[fieldName] === false) {
                return (
                  <tr key={fieldName}>
                    <td>
                      <label htmlFor={fieldName}>{ startCase(fieldName) }</label>
                    </td>
                    <td>
                      <input
                        name={fieldName}
                        // @ts-ignore
                        onChange={(evt: SyntheticEvent<HTMLInputElement>) => onChange(fieldName, !workingItem[fieldName])}
                        type={(fieldTypes as any)[fieldName] === false ? 'checkbox' : 'text'}
                        checked={(workingItem as any)[fieldName]}
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
      </form>
    </ElectronOnly>
  )
}

export default AdminItem
