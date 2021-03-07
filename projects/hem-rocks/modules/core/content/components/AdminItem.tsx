import React, { ReactElement, useState, SyntheticEvent, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import produce from 'immer'
import uuid from 'uuid'
import { isEmpty, isEqual, startCase, find } from 'lodash'
import { slugify, titleCase } from 'voca'
import { ElectronOnly, ZoomTextarea } from '../../../../../../lib/components'
import { assetHostHostname } from '../../../../functions'
import { selectableCategories, IContentItem, fieldTypes, modelize, requestCreateItems, requestDeleteItems, requestUpdateItems, hasCategory, categories } from '../index'
import { RootState } from '../../../../index'

interface IProps {
  create: boolean
  itemSlug?: string
}

function AdminItem({ create, itemSlug }: IProps): ReactElement {
  const { allContentItems, currentProject } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    currentProject: state.content.currentProject,
  }))

  const dispatch = useDispatch()

  const history = useHistory()

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
      // @ts-ignore
      item = modelize({
        id: uuid(),
        project: currentProject,
        published: true,
      } as Partial<IContentItem>)
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

  useEffect(function saveShortcut() {
    // document.body.addEventListener('keydown', function (evt) {
    //   if (
    //     evt.keyCode === 83
    //     && evt.metaKey === true
    //     && canSave
    //   ) {
    //     const payloadItem = Object.assign({}, workingItem)
    //     const textarea = document.getElementsByTagName('textarea')[0]
    //     payloadItem.description = textarea.innerHTML
    //     dispatch(requestUpdateItems([payloadItem]))
    //     setCanSave(false)
    //   }
    // })
  }, [canSave])

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

      if (isEmpty(payloadItem.slug)) {
        payloadItem.slug = slugify(payloadItem.title)
      }

      // @ts-ignore
      if (payloadItem.slug !== originalItem.slug) {
        // @ts-ignore
        dispatch(requestDeleteItems([originalItem.slug]))
        dispatch(requestCreateItems([payloadItem]))
      }

      else if (create) {
        dispatch(requestCreateItems([payloadItem]))
      }

      else {
        dispatch(requestUpdateItems([payloadItem]))
      }

      setOriginalItem(workingItem)
      setCanSave(false)

      history.push('/admin/list')
    }, [workingItem],
  )

  if (!workingItem) return (
    <header className="admin-item-header">
      <h2>Loading...</h2>
    </header>
  )

  const keys = Object.keys(workingItem)
  const preferredOrder = [
    'project',
    'title',
    'published',
    'category',
    'properties',
    'tags',
    'blurb',
    'description',
    'attribution',
    'secondaryAttribution',
    'date',
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

  const assetHost = assetHostHostname()

  return (
    <ElectronOnly showMessage={true}>
      <form onSubmit={onSubmit}>
        <header className="admin-item-header">
          <h2>{ originalItem?.title }</h2>
          <div className="admin-item-key-art clearfix">
            { originalItem && (originalItem.keyArtFullPath || originalItem.keyArt) && (
              <img src={(
                originalItem.keyArtFullPath
                  ? `${assetHost}/${currentProject}/${originalItem.keyArtFullPath}`
                  : `${assetHost}/${currentProject}/content/images/key-art/${originalItem.keyArt}`
              )}/>
            )}
          </div>
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
            <tr>
              <td>
                <label htmlFor="id">Id</label>
              </td>
              <td>
                <input
                  disabled
                  type="text"
                  value={workingItem.id}
                />
              </td>
            </tr>
            { orderedKeys.map(fieldName => {
              if (fieldName === 'id') return
              if (fieldName === 'userSuggestedPrice') return
              if (fieldName === 'attachments' && workingItem.category === 'tracks') return
              if (fieldName === 'trackResourceId' && workingItem.category !== 'tracks') return
              if (fieldName === 'trackResourceSecret' && workingItem.category !== 'tracks') return

              if (fieldName === 'category') {
                return (
                  <tr key={fieldName}>
                    <td>
                      <label htmlFor="category">Category</label>
                    </td>
                    <td>
                      <select
                        className="custom-select"
                        name="select"
                        onChange={(evt: SyntheticEvent<HTMLSelectElement>) => onChange(fieldName, evt.currentTarget.value)}
                        value={(workingItem as any)[fieldName]}
                        defaultValue="all"
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
                    </td>
                  </tr>
                )
              }

              else if ((fieldTypes as any)[fieldName] === 'textarea') {
                return (
                  <React.Fragment key={fieldName}>
                    <tr>
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
                    { fieldName === 'attachments' && (
                      <tr key={fieldName + '-items'}>
                        <td>
                          <label>Track Titles</label>
                        </td>
                        <td>
                          <pre>
                            { workingItem.attachments.split('\n').map(
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
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
                        id={fieldName}
                        name={fieldName}
                        onChange={(evt: SyntheticEvent<HTMLInputElement>) => onChange(fieldName, evt.currentTarget.value)}
                        type={(fieldTypes as any)[fieldName]}
                        value={(workingItem as any)[fieldName]}
                        required={fieldName === 'title'}
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
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '20px',
        height: '20px',
        zIndex: 99999999,
        backgroundColor: 'red',
        display: canSave ? 'block' : 'none',
      }}/>
    </ElectronOnly>
  )
}

export default AdminItem
