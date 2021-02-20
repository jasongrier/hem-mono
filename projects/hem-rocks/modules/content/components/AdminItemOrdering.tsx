import React, { ReactElement, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import produce from 'immer'
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ElectronOnly } from '../../../../../lib/components'
import { IContentItem, hasTag, requestUpdateItems, } from '../index'
import { RootState } from '../../../index'
import { requestReadItems } from '../actions'
import { hasCategory } from '../functions'

interface IProps { }

function AdminItemOrdering({ }: IProps): ReactElement {
  const { allContentItems, chunkLog } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const [finalItems, setFinalItems] = useState<IContentItem[]>([])
  const [canSave, setCanSave] = useState<boolean>(false)

  useEffect(function init() {
    dispatch(requestReadItems())
  }, [])

  useEffect(function setContent() {
    if (!allContentItems.length) return

    let sortSet = Array.from(allContentItems)

    sortSet = sortSet.filter(item => (
      hasCategory(item, 'projects')
      && hasTag(item, 'labels')
      && item.project === 'jag.rip'
    ))

    sortSet.sort(
      (a: IContentItem, b: IContentItem) => parseInt(a.order, 10) - parseInt(b.order, 10)
    )

    setFinalItems(sortSet)
  }, [allContentItems])

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

  return (
    <ElectronOnly showMessage={true}>
      <div className="admin-list">
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
        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
      </div>
    </ElectronOnly>
  )
}

export default AdminItemOrdering
