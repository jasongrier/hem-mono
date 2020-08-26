import React, { ReactElement, useState, SyntheticEvent, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import produce from 'immer'
import { isEmpty, isEqual, startCase } from 'lodash'
import { slugify } from 'voca'
import { ElectronOnly, ZoomTextarea } from '../../../../../lib/components'
import { assetHostHostname } from '../../../functions'
import { IContentItem, fieldTypes, modelize, requestCreateItems, requestDeleteItems, requestUpdateItems, hasCategory } from '../index'
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
      const nextHighestId = allContentItems.map(item => parseInt(item.id, 10)).sort((a, b) => a - b).pop() + 1
      item = modelize({ id: nextHighestId })
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
      console.log(value)
      draftItem[fieldName] = value
      setCanSave(!isEqual(draftItem, originalItem))
    }))
  }

  const onSubmit = useCallback(
    function onSubmitFn(evt: SyntheticEvent<HTMLFormElement>) {
      evt.preventDefault()

      if (!workingItem) return

      for (const item of allContentItems) {
        if (item.id === workingItem.id) continue
        if (item.slug === workingItem.slug) {
          alert('Duplicate slug: ' + workingItem.slug)
          return
        }
      }

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
    'tags',
    'title',
    'titleWrapping',
    'description',
    'secondaryTitle',
    'category',
    'order',
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

  const presetTags = [
    'Architecture',
    'Condom And Needle Vending Machines',
    'Elon Musk',
    'Free Shit',
    'Fucked Up Phone Booths',
    'Glitter',
    'Flowers',
    'Trees',
    'Walls',
    'Sidewalks',
    'Shop Windows',
    'Birdhouses',
    'Graffiti',
    'Grass',
    'Green Depth',
    'Grit',
    'Guerilla Gardening',
    'High Up',
    'Night Time',
    'Old Shit',
    'Pappelfuzz',
    'Paths',
    'Patterns',
    'Poingancy',
    'Pretty Skies',
    'Purple Pipe',
    'Rain',
    'Sandy Soil',
    'Signage',
    'Soviet Stuff',
    'Statues',
    'Stucco',
    'Summer Vibes',
    'Swans',
    'Taped Up Boxes And Poles',
    'The Canal',
    'Trash Configurations',
    'Weirdness',
    'Ruins',
    'German Words',
    'Kids',
    'Rainbows',
    'Poignancy',
    'The Baloon',
    'Storage Spaces',
    'Things in Windows',
  ]

  return (
    <ElectronOnly showMessage={true}>
      <form onSubmit={onSubmit}>
        <header className="admin-item-header">
          <h2>{ originalItem?.title }</h2>
          <div className="admin-item-key-art clearfix">
            { originalItem && hasCategory(originalItem, 'stock-photos') && (
              <img src={`${assetHost}/berlin-stock-photos/content/images/jpg-web/${originalItem.keyArt}`} />
            )}
            { originalItem && !hasCategory(originalItem, 'stock-photos') && (
              <img src={`${assetHost}/hem-rocks/content/images/key-art/${originalItem.keyArt}`} />
            )}
          </div>
          <button
            className="action-button publish-item-button"
            onClick={(evt) => {
              evt.preventDefault()
              
              if (originalItem) {
                const updatedItem: IContentItem = produce(originalItem, (draftItem) => {
                  draftItem.published = !draftItem.published
                })
                dispatch(requestUpdateItems([updatedItem]))
              }
              
              setWorkingItem(produce(workingItem, (draftItem: any) => {
                draftItem.published = !draftItem.published
              }))
            }}
          >
            { workingItem.published ? 'Unpublish' : 'Publish' }
          </button>
          <button
            className="action-button save-item-button"
            disabled={!canSave}
            type="submit"
          >
            Save
          </button>
          <div style={{
            paddingLeft: '420px',
          }}>
            { presetTags.map(tag => (
              <div 
                onClick={() => {
                  setWorkingItem(produce(workingItem, (draftItem: any) => {
                    draftItem.tags = (draftItem.tags + ', ' + slugify(tag)).replace(/^, /, '')
                    setCanSave(!isEqual(draftItem, originalItem))
                  }))
                }} 
                style={{ 
                  float: 'left', 
                  margin: '0 10px 10px 0', 
                  border: '1px solid #000', 
                  padding: '5px', 
                  cursor: 'pointer',
                  lineHeight: '20px',
                }}
              >
                { tag }
              </div>
            ))}
          </div>
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
              if (fieldName === 'trackSlugs' && workingItem.category === 'tracks') return
              if (fieldName === 'trackResourceId' && workingItem.category !== 'tracks') return
              if (fieldName === 'trackResourceSecret' && workingItem.category !== 'tracks') return

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
                        id={fieldName}
                        name={fieldName}
                        onChange={(evt: SyntheticEvent<HTMLInputElement>) => onChange(fieldName, evt.currentTarget.value)}
                        type={(fieldTypes as any)[fieldName]}
                        value={(workingItem as any)[fieldName]}
                        required={(
                          fieldName === 'title'
                          || fieldName === 'category'
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
