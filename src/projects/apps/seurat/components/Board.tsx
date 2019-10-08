import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Dot from './Dot'

function renderDots(boardSize: number) {
  const dots = []

  for (let i = 0; i < boardSize; i ++) {
    dots.push(<Dot dotNumber={i} key={i} />)
  }

  return dots
}

function Board(): ReactElement {
  const { boardSize } = useSelector((state: RootState) => ({
    boardSize: state.app.boards[state.app.currentBoard].size,
  }))

  return (
    <div className={`board board--${boardSize}`}>
      {renderDots(boardSize)}
    </div>
  )
}

export default Board
