import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useClock } from '../hooks'
import { flashDots } from '../helpers'
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

  useClock('web')

  return (
    <div className="board">
      {renderDots(boardSize)}
    </div>
  )
}

export default Board
