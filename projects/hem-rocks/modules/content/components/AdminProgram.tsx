import React, { ReactElement, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import produce from 'immer'
import { map, filter } from 'lodash'
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ElectronOnly } from '../../../../../lib/components'
import { AdminProgramNewItemForm, AdminProgramMonth, IContentItem, requestReadItems, hasTag, requestUpdateItems, hasCategory } from '../index'
import { RootState } from '../../../index'

function getUnscheduledItems(programItems: IContentItem[]) {
  return Array.from(
    programItems.filter(i => !hasTag(i, 'scheduled'))
    .sort((a, b) => parseInt(a.order, 10) - parseInt(b.order, 10))
  )
}

function AdminProgram(): ReactElement {
  const { allContentItems, programItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    programItems: state.content.contentItems.filter(item =>
      hasCategory(item, 'program')
      && item.published
    ),
  }))

  const dispatch = useDispatch()

  const [unscheduledItems, setUnscheduledItems] = useState<IContentItem[]>([])

  const [months, setMonths] = useState<Array<{ month: string, open: boolean}>>([
    { month: 'March', open: true },
    { month: 'April', open: false },
    { month: 'May', open: false },
    { month: 'June', open: false },
    { month: 'July', open: false },
    { month: 'August', open: false },
    { month: 'September', open: false },
    { month: 'November', open: false },
    { month: 'December', open: false },
  ])

  useEffect(function init() {
    dispatch(requestReadItems())
  }, [])

  useEffect(function loadItems() {
    if (!unscheduledItems.length)
    setUnscheduledItems(getUnscheduledItems(programItems))
  }, [programItems, unscheduledItems])

  useEffect(function sidebarFollow() {
    const months: HTMLDivElement = document.querySelector('.admin-program-months')
    const scrollLockContainer = document.querySelector('.scroll-lock-container')

    scrollLockContainer.addEventListener('scroll', function() {
      const height = this.scrollTop
      months.style.marginTop = height < 200 ? '0' : (height - 200) + 'px'
    })
  }, [])

  function onDragEnd(res: any) {
    const unscheduledList = Array.from(unscheduledItems)
    const { source, destination } = res

    if (destination.droppableId.includes('admin-program-month')) {
      const month = destination.droppableId.replace('admin-program-month-', '')

      if (source.droppableId === 'unassigned-items') {
        const newItem = Object.assign({}, unscheduledList[source.index])
        newItem.date = month + ' 2021'
        newItem.tags = newItem.tags + ', scheduled'

        setUnscheduledItems([])
        dispatch(requestUpdateItems([newItem]))
      }

      else if (source.droppableId.includes('admin-program-month')) {
        const sourceMonth = source.droppableId.replace('admin-program-month-', '')
        const destinationMonth = destination.droppableId.replace('admin-program-month-', '')
        const sourceMonthItems: IContentItem[] | undefined = programItems.filter(i => i.date === sourceMonth + ' 2021' && hasTag(i, 'scheduled'))
        const newItem = Object.assign({}, sourceMonthItems[source.index])

        newItem.date = destinationMonth + ' 2021'

        setUnscheduledItems([])
        dispatch(requestUpdateItems([newItem]))
      }

      else {
        const monthItems: IContentItem[] | undefined = programItems.filter(i => i.date === month + ' 2021' && hasTag(i, 'scheduled'))
        const [movedItem] = monthItems.splice(res.source.index, 1)
        monthItems.splice(res.destination.index, 0, movedItem)

        for (let i = 0; i < monthItems.length; i ++) {
          const payloadItem: IContentItem = produce(monthItems[i], (draftItem) => {
            draftItem.order = (i + 1).toString()
          })
          setUnscheduledItems([])
          dispatch(requestUpdateItems([payloadItem]))
        }
      }
    }

    else if (destination.droppableId === 'unassigned-items') {
      const newItems = Array.from(unscheduledList)

      if (source.droppableId === 'unassigned-items') {
        const newItem = Object.assign({}, unscheduledList[res.source.index])
        newItem.tags = newItem.tags.replace(', scheduled', '')
        newItems.splice(res.source.index, 1)
        newItems.splice(res.destination.index, 0, newItem)
      }

      else {
        const month = res.source.droppableId.replace('admin-program-month-', '')
        const monthItems: IContentItem[] | undefined = programItems.filter(i => i.date === month + ' 2021' && hasTag(i, 'scheduled'))
        const newItem = Object.assign({}, monthItems[res.source.index])

        newItem.tags = newItem.tags.replace(', scheduled', '')
        newItems.splice(res.destination.index, 0, newItem)
      }

      let payloadItems: IContentItem[] = []

      for (let i = 0; i < newItems.length; i ++) {
        const payloadItem: IContentItem = produce(newItems[i], (draftItem) => {
          draftItem.order = (i + 1).toString()
        })
        payloadItems.push(payloadItem)
      }

      setUnscheduledItems([])
      dispatch(requestUpdateItems(payloadItems))
    }
  }

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: 'none',
    padding: '6px',
    margin: '0 0 10px 0',
    borderRadius: '3px',
    background: isDragging ? 'lightgrey' : 'grey',
    ...draggableStyle,
  })

  const getListStyle = (isDraggingOver : any) => ({
    background: 'transparent',
    padding: 0,
    width: 490,
  })

  return (
    <ElectronOnly showMessage={true}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="admin-list admin-program">
          <div className="admin-list-controls clearfix">
            <AdminProgramNewItemForm onSubmit={() => setUnscheduledItems([])} />
          </div>
          <div className="admin-program-content clearfix">
            <div className="admin-program-column admin-program-items">
              <div className="admin-program-box admin-program-box-open admin-program-items-unassigned">
                <Droppable droppableId="unassigned-items">
                  {(provided: any, snapshot: any) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {unscheduledItems.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided: any, snapshot: any) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}
                            >
                              <span className={`admin-program-item admin-program-state-${item.tags}`}>
                                <b>{ item.type }</b> { item.title }
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      { provided.placeholder }
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
            <div className="admin-program-column admin-program-months">
              { months.map(({ month, open }) => (
                <div
                  key={month}
                  className={`
                    admin-program-box admin-program-month
                    ${open ? 'admin-program-box-open' : ''}
                  `}
                >
                  <h3 onClick={() => {
                    setMonths(produce(months, (draftMonths) => {
                      const newMonth = draftMonths.find(m => m.month === month)
                      if (!newMonth) return
                      newMonth.open = !newMonth.open
                    }))
                  }}>
                    { month } 2021
                  </h3>
                  <AdminProgramMonth
                    id={`admin-program-month-${month}`}
                    items={programItems
                      .filter(i => i.date.split(' ')[0] === month && hasTag(i, 'scheduled'))
                      .sort((a, b) => parseInt(a.order, 10) - parseInt(b.order, 10))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DragDropContext>
    </ElectronOnly>
  )
}

export default AdminProgram
