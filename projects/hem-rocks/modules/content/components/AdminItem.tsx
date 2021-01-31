import React, { ReactElement, useState, SyntheticEvent, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import produce from 'immer'
import { isEmpty, isEqual, startCase, find } from 'lodash'
import { slugify, titleCase } from 'voca'
import { ElectronOnly, ZoomTextarea } from '../../../../../lib/components'
import { assetHostHostname } from '../../../functions'
import { categories, IContentItem, fieldTypes, modelize, requestCreateItems, requestDeleteItems, requestUpdateItems, hasCategory } from '../index'
import { RootState } from '../../../index'
import { BERLIN_STOCK_PHOTOS } from '../../../config'
import uuid from 'uuid'

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
      item = modelize({ id: uuid() })
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
    'title',
    'category',
    'tags',
    'attribution',
    'secondaryAttribution',
    'titleWrapping',
    'description',
    'secondaryTitle',
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
    'Abandoned Bikes',
    'Abstract',
    'Arches and Overpasses',
    'Architecture',
    'Astronomy',
    'Bikes',
    'Birdhouses',
    'Bottles',
    'Bottle Caps',
    'Broken Glass',
    'Candy Machines',
    'Cobblestones',
    'Condom And Needle Vending Machines',
    'Construction',
    'Cool Cars',
    'Coronatimes',
    'Doener',
    'Doors',
    'Drinking',
    'Elon Musk',
    'Fences',
    'Flowers',
    'Food Photography',
    'Forest',
    'Free Shit',
    'Fucked Up Cars',
    'Fucked Up Phone Booths',
    'German Words',
    'Glass Bottle Gumdrops',
    'Glitter',
    'Graffiti',
    'Grass',
    'Gray Skies',
    'Green Depth',
    'Grit',
    'Guerilla Gardening',
    'High Up',
    'Industry',
    'Interiors',
    'Iron and Steel',
    'Kids',
    'Lakes',
    'Malfunction',
    'Maritime',
    'Markets',
    'Monuments',
    'Nice Fonts',
    'Nite Time',
    'Old Shit',
    'Pappelfuzz',
    'Parks',
    'Paths',
    'Patterns',
    'People',
    'Piles',
    'Poignancy',
    'Political',
    'Posters',
    'Pretty Skies',
    'Pretty Tiles',
    'Public Works',
    'Puddles',
    'Purple Pipe',
    'Railing',
    'Rain',
    'Rainbows',
    'Ruins',
    'Rust',
    'Sandy Soil',
    'Shopping Carts',
    'Sidewalks',
    'Signage',
    'Silver Paint',
    'Soviet Stuff',
    'Spaetis',
    'Springtime',
    'Statues',
    'Stickers',
    'Stone',
    'Storage Spaces',
    'Storefronts',
    'Streets',
    'Street Signs',
    'Stucco',
    'Summer Vibes',
    'Swans',
    'Taped Up Boxes And Poles',
    'The Baloon',
    'The Canal',
    'The Spree',
    'The Wall',
    'Trash Configurations',
    'Trees',
    'Treptow',
    'Utility Boxes',
    'Walls',
    'Weeds',
    'Weeping Willow Trees',
    'Weirdness',
    'Windows',
    'WTF',
  ]

  return (
    <ElectronOnly showMessage={true}>
      <form onSubmit={onSubmit}>
        <header className="admin-item-header">
          <h2>{ originalItem?.title }</h2>
          <div className="admin-item-key-art clearfix">
            { originalItem && originalItem.keyArt && hasCategory(originalItem, 'stock-photos') && (
              <img src={`${assetHost}/berlin-stock-photos/content/images/jpg-web/${originalItem.keyArt}`} />
            )}
            { originalItem && originalItem.keyArt && !hasCategory(originalItem, 'stock-photos') && (
              <img src={`${assetHost}/hem-rocks/content/images/key-art/${originalItem.keyArt}`} />
            )}
          </div>
          {/* <button
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
          </button> */}
          <button
            className="action-button save-item-button"
            disabled={!canSave}
            type="submit"
          >
            Save
          </button>
          { hasCategory(workingItem, 'stock-photos') && (
            <div style={{
              paddingLeft: '420px',
            }}>
              { presetTags.map(tag => (
                <div
                  key={slugify(tag)}
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
          )}
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
                      >
                        <option value="all">All</option>
                        { categories.map(category => (
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
