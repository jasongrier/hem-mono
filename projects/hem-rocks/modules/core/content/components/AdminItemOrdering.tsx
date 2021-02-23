import React, { ReactElement, useState, useEffect, useCallback, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import produce from 'immer'
import { find } from 'lodash'
import { titleCase } from 'voca'
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ElectronOnly } from '../../../../../../lib/components'
import { IContentItem, hasTag, orderSortFnFact, requestReadItems, fieldIsSerialized, requestUpdateItems, parseSerializedOrderFieldValue, updateSerializedOrderFieldValue } from '../index'
import { RootState } from '../../../../index'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

interface IProps { }

function AdminItemOrdering({ }: IProps): ReactElement {
  const { allContentItems, currentProject } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    currentProject: state.content.currentProject,
  }))

  const dispatch = useDispatch()

  const [finalItems, setFinalItems] = useState<IContentItem[]>([])
  const [canSave, setCanSave] = useState<boolean>(false)
  const [currentFilter, setCurrentFilter] = useState<string>(PROJECT_CONFIGS[currentProject].ORDERING_BUCKETS[0])

  useEffect(function init() {
    dispatch(requestReadItems())
  }, [])

  useEffect(function initContent() {
    if (!allContentItems.length) return

    let sortSet = Array.from(allContentItems)

    sortSet = sortSet.filter(item => (
      hasTag(item, currentFilter)
      && item.project === currentProject
      && item.published
    ))

    sortSet.sort(orderSortFnFact(currentFilter))

    setFinalItems(sortSet)
  }, [allContentItems, currentFilter])

  function onDragEnd(res: any) {
    if (!res.source) return
    if (!res.destination) return

    const reorderedItems = Array.from(finalItems)
    const [removed] = reorderedItems.splice(res.source.index, 1)

    reorderedItems.splice(res.destination.index, 0, removed)

    setFinalItems(reorderedItems)
    setCanSave(true)
  }

  const onFilterSelectChanged = useCallback(
    function onFilterSelectChangedFn(evt: SyntheticEvent<HTMLSelectElement>) {
      setCurrentFilter(evt.currentTarget.value)
    }, [],
  )

  const onSaveClick = useCallback(
    function onSaveClickFn() {
      for (let i = 0; i < finalItems.length; i ++) {
        const updatedItem: IContentItem = produce(finalItems[i], (draftItem) => {
          const order = (i + 1).toString()

          if (PROJECT_CONFIGS[currentProject].HAS_SERIALIZED_ITEM_ORDER) {
            draftItem.order = updateSerializedOrderFieldValue(draftItem.order, currentFilter, order)
          }

          else {
            draftItem.order = order
          }
        })

        dispatch(requestUpdateItems([updatedItem]))
        setCanSave(false)
      }
    }, [finalItems, currentFilter],
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
          { PROJECT_CONFIGS[currentProject].HAS_SERIALIZED_ITEM_ORDER && (
            <select
              className="custom-select"
              name="select"
              onChange={onFilterSelectChanged}
              value={currentFilter}
            >
              { PROJECT_CONFIGS[currentProject].ORDERING_BUCKETS.map(filter => (
                <option
                  key={filter}
                  value={filter}
                >
                  { titleCase(
                    filter
                      .replace(/-/g, ' ')
                      .replace(/%26/g, '&')
                  )}
                </option>
              ))}
            </select>
          )}
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
                        {(() => {
                          let orderToDisplay

                          if (
                            PROJECT_CONFIGS[currentProject].HAS_SERIALIZED_ITEM_ORDER
                            && fieldIsSerialized(item.order)
                          ) {
                            const bucket = find(parseSerializedOrderFieldValue(item.order), { filter: currentFilter })
                            orderToDisplay = bucket ? bucket.order : item.order
                          }

                          else {
                            orderToDisplay = item.order
                          }

                          return `${item.attribution ? item.attribution + ': ' : ''}${item.title} (${orderToDisplay})`
                        })()}
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
