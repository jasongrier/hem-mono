import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hasCategory, hasTag, requestReadChunk, IContentItem } from '../../../modules/core/content'
import { RootState } from '../../../index'

function Todos(): ReactElement {
  const { chunkLog, todos } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    todos: state.content.contentItems.filter(item => hasCategory(item, 'todos')),
  }))

  const dispatch = useDispatch()

  useEffect(function getChunk() {
    if (chunkLog.includes('todos')) return
    dispatch(requestReadChunk('todos'))
  }, [chunkLog])

  return (
    <div className="page page-internal page-internal-todos">
      <h1>Todo's</h1>
      <ul className="page-internal-todos-list">
        { todos.map(todo => (
          <li>
            <div>
              <input
                type="checkbox"
                defaultChecked={hasTag(todo, 'done-todo')}
              />
            </div>
            <div>
              { todo.title }
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos
