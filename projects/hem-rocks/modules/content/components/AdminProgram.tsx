import React, { ReactElement, useState, SyntheticEvent, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import produce from 'immer'
import { isEmpty, isEqual, startCase, find, map, filter } from 'lodash'
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { slugify } from 'voca'
import { ElectronOnly, ZoomTextarea } from '../../../../../lib/components'
import { assetHostHostname } from '../../../functions'
import { IContentItem, requestReadChunk, fieldTypes, hasTag, modelize, requestCreateItems, requestDeleteItems, requestUpdateItems, hasCategory } from '../index'
import { RootState } from '../../../index'
import { BERLIN_STOCK_PHOTOS } from '../../../config'
import uuid from 'uuid/v1'
import { Deva } from '../../../components/layout'

interface IProps { }

function AdminProgram({ }: IProps): ReactElement {
  const { programItems } = useSelector((state: RootState) => ({
    programItems: state.content.contentItems.filter(item => hasCategory(item, 'program')),
  }))

  const dispatch = useDispatch()

  const [finalItems, setFinalItems] = useState<IContentItem[]>([])
  const [canSave, setCanSave] = useState<boolean>(false)
  const [workingNewItem, setWorkingNewItem] = useState<IContentItem>(modelize({
    id: uuid(),
    category: 'program',
    tags: 'invited',
    type: 'Tracks',
    published: true,
  }))

  useEffect(function init() {
    dispatch(requestReadChunk('program'))
  }, [])

  // useEffect(function setContent() {
  //   if (!allContentItems.length) return

  //   let sortSet = Array.from(allContentItems)

  //   sortSet = sortSet.filter(item => (
  //     hasCategory(item, 'home-features')
  //   ))

  //   sortSet.sort(
  //     (a: IContentItem, b: IContentItem) => parseInt(a.order, 10) - parseInt(b.order, 10)
  //   )

  //   setFinalItems(sortSet)
  // }, [allContentItems])

  function onDragEnd(res: any) {
    if (!res.source) return
    if (!res.destination) return

    const reorderedItems = Array.from(finalItems)
    const [removed] = reorderedItems.splice(res.source.index, 1)

    reorderedItems.splice(res.destination.index, 0, removed)

    setFinalItems(reorderedItems)
    setCanSave(true)
  }

  const onSaveClick = useCallback(
    function onSaveClickFn() {
      for (let i = 0; i < finalItems.length; i ++) {
        const updatedItem: IContentItem = produce(finalItems[i], (draftItem) => {
          draftItem.order = (i + 1).toString()
        })
        dispatch(requestUpdateItems([updatedItem]))
        setCanSave(false)
      }
    }, [finalItems],
  )

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

      payloadItem.slug = slugify(payloadItem.title)

      dispatch(requestCreateItems([payloadItem]))
    }, [workingNewItem],
  )

  const grid = 4

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
  })

  const getListStyle = (isDraggingOver : any) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 450,
  })

  const months = [
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'November',
    'December',
  ]

  return (
    <ElectronOnly showMessage={true}>
      <div className="admin-list admin-program">
        <div className="admin-list-controls clearfix">
          <button
            className="action-button save-item-button"
            type="submit"
            disabled={!canSave}
            onClick={onSaveClick}
            style={{ opacity: canSave ? 1 : .4 }}
          >
            Save
          </button>
        </div>
        <div className="admin-program-content clearfix">
          <div className="admin-program-column admin-program-months">
            <div className="admin-program-box admin-program-devas">
              <Deva
                name="bird-of-pointerdise"
                animate={false}
              />
              <Deva
                name="mr-namaste"
                animate={false}
              />
              <Deva
                name="chill-fishy"
                animate={false}
              />
              <Deva
                name="kuhllucko"
                animate={false}
              />
            </div>
            { months.map(month => (
              <div
                key={month}
                className="admin-program-box admin-program-month"
              >
                <h3>{ month } 2021</h3>
                <ul>
                  { programItems
                      .filter(i => i.date.split(' ')[0] === month)
                      .sort((a, b) => parseInt(a.order, 10) - parseInt(b.order, 10))
                      .map(item => (
                        <li key={item.id}>
                          <h5>{ item.title }</h5>
                          <p>{ item.secondaryTitle }</p>
                        </li>
                      )
                  )}
                </ul>
              </div>
            ))}
          </div>
          <div className="admin-program-column admin-program-items">
            <div className="admin-program-box admin-program-items-new">
              <form onSubmit={onNewItemFormSubmit}>
                <h3>New Item</h3>
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
                    <option value="invited">Invited</option>
                    <option value="wish-list">Wish List</option>
                    <option value="needs-permission">Needs Permission</option>
                    <option value="available">Available</option>
                  </select>
                </div>
                <div>
                  <label>Note:</label>
                  <input
                    onChange={(evt: SyntheticEvent<HTMLInputElement>) => onNewItemFieldChange('note', evt.currentTarget.value)}
                    placeholder="Note"
                    type="text"
                  />
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
            <div className="admin-program-box admin-program-items-new">
              {/* <ul className="admin-program-box admin-program-items-list">
                { programItems.filter(i => !hasTag(i, 'scheduled')).map(item => (
                  <li key={item.id}>
                    <h5>{ item.title }</h5>
                    <p>{ item.secondaryTitle }</p>
                  </li>
                ))}
              </ul> */}

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided: any, snapshot: any) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {programItems.filter(i => !hasTag(i, 'scheduled')).map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided: any, snapshot: any) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {item.title}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      { provided.placeholder }
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </ElectronOnly>
  )
}

export default AdminProgram
