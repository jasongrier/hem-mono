import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Dot from './Dot'

function Board(): ReactElement {
  const { boardSize } = useSelector((state: RootState) => ({
    boardSize: state.app.boardSize,
  }))

  return (
    <div className="board">
      {[...Array(boardSize)].map(i => (
        <Dot id={i} key={i} />
      ))}
    </div>
  )
}

export default Board
