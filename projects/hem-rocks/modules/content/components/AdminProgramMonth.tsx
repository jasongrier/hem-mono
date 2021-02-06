import React, { ReactElement } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { IContentItem } from '../index'

interface IProps {
  id: string
  items: IContentItem[]
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
  background: '#222',
  padding: 0,
  width: 490,
  minHeight: 150,
})

function AdminProgramMonth({ id, items }: IProps): ReactElement {
  return (
    <div className="admin-program-box-content">
      <Droppable droppableId={id}>
        {(provided: any, snapshot: any) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            {items.map((item: any, index: any) => (
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
                    <span className={`admin-program-item admin-program-state-${item.tags.replace(', scheduled', '')}`}>
                      <b>{ item.type }</b> { item.title }
                    </span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default AdminProgramMonth
