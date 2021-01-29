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
import uuid from 'uuid'

interface IProps { }

function AdminProgram({ }: IProps): ReactElement {
  const { programItems } = useSelector((state: RootState) => ({
    programItems: state.content.contentItems.filter(item => hasCategory(item, 'program')),
  }))

  const dispatch = useDispatch()

  const [finalItems, setFinalItems] = useState<IContentItem[]>([])
  const [canSave, setCanSave] = useState<boolean>(false)

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
        <div className="admin-program-column admin-program-months">
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
                      <li>
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
            <form action="">
              <h3>New Item</h3>
              <label htmlFor="">Name:</label>
              <input type="text" placeholder="Name" />
              <label htmlFor="">Type:</label>
              <select>
                <option value="">Apps</option>
                <option value="">Articles</option>
                <option value="">Editions</option>
                <option value="">Mixes</option>
                <option value="">Sound Library</option>
                <option value="">Tracks</option>
              </select>
              <label htmlFor="">Status:</label>
              <select>
                <option value="">Invited</option>
                <option value="">Wish List</option>
                <option value="">Needs Permission</option>
                <option value="">Available</option>
              </select>
              <label htmlFor="">Note:</label>
              <input type="text" placeholder="Note" />
              <button type="submit">Create</button>
            </form>
          </div>
          <h3>Unassigned</h3>
          <ul className="admin-program-box admin-program-items-list">
            { programItems.filter(i => !hasTag(i, 'scheduled')).map(item => (
              <li>
                <h5>{ item.title }</h5>
                <p>{ item.secondaryTitle }</p>
              </li>
            ))}
          </ul>
        </div>
        {/* <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided: any, snapshot: any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {finalItems.map((item, index) => (
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
                        {item.attribution}: {item.title} ({item.order})
                      </div>
                    )}
                  </Draggable>
                ))}
                { provided.placeholder }
              </div>
            )}
          </Droppable>
        </DragDropContext> */}
      </div>
    </ElectronOnly>
  )
}

export default AdminProgram
