import React, { ReactElement } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { IContentItem } from '../index'

interface IProps {
  id: string
  items: IContentItem[]
}

const grid = 8

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle
})

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 472,
} as any)

function AdminProgramMonth({ id, items }: IProps): ReactElement {
  function onDragEnd(res: any) {
    // const { source, destination } = result

    // // dropped outside the list
    // if (!destination) {
    //   return
    // }

    // if (source.droppableId === destination.droppableId) {
    //   const items = reorder(
    //     this.getList(source.droppableId),
    //     source.index,
    //     destination.index
    //   )

    //   let state = { items }

    //   if (source.droppableId === 'droppable2') {
    //     state = { selected: items } as any
    //   }

    //   this.setState(state)

    // }

    // else {
    //   const result = move(
    //     this.getList(source.droppableId),
    //     this.getList(destination.droppableId),
    //     source,
    //     destination
    //   )

    //   this.setState({
    //     // @ts-ignore
    //     items: result.droppable,
    //     // @ts-ignore
    //     selected: result.droppable2
    //   })
    // }
  }

  return (
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
                  )}>
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default AdminProgramMonth
