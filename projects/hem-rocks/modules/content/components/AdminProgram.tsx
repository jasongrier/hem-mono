import React, { ReactElement, useState, SyntheticEvent, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import produce from 'immer'
import { isEmpty, isEqual, startCase, find, map, filter } from 'lodash'
// @ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ElectronOnly, ZoomTextarea } from '../../../../../lib/components'
import { assetHostHostname } from '../../../functions'
import { AdminProgramNewItemForm, AdminProgramMonth, uniqueSlug, IContentItem, requestReadItems, fieldTypes, hasTag, modelize, requestCreateItems, requestDeleteItems, requestUpdateItems, hasCategory } from '../index'
import { RootState } from '../../../index'
import { BERLIN_STOCK_PHOTOS } from '../../../config'
import uuid from 'uuid/v1'
import { Deva } from '../../../components/layout'

function getUnscheduledItems(programItems: IContentItem[]) {
  return programItems.filter(i => !hasTag(i, 'scheduled'))
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

  const [months, setMonths] = useState<Array<{ month: string, open: boolean}>>([
    { month: 'March', open: false },
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

  const onDragEnd = useCallback(
    function onDragEndFn(res: any) {
      const { source, destination } = res

      if (destination.droppableId.includes('admin-program-month')) {
        const month = destination.droppableId.replace('admin-program-month-', '')
        const date = month + ' 2021'
        const sourceList = getUnscheduledItems(programItems)
        const item = sourceList[source.index]
        console.log(item.title)
      }

    }, [programItems],
  )

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
            <AdminProgramNewItemForm />
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
                      {getUnscheduledItems(programItems).map((item, index) => (
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
                                provided.draggableProps.style
                              )}
                            >
                              <span className={`admin-program-item admin-program-state-${item.tags}`}>
                                <b>{ item.type }</b> {item.title}
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
                  <div
                    className="admin-program-box-toggle"
                    onClick={() => {
                      setMonths(produce(months, (draftMonths) => {
                        const newMonth = draftMonths.find(m => m.month === month)
                        if (!newMonth) return
                        newMonth.open = !newMonth.open
                      }))
                    }}
                  >
                    {open ? 'close' : 'open'}
                  </div>
                  <h3>{ month } 2021</h3>
                  {/* <ul>
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
                  </ul> */}
                  <AdminProgramMonth
                    id={`admin-program-month-${month}`}
                    items={programItems
                      .filter(i => i.date.split(' ')[0] === month)
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
