import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Dot from './Dot'

function Board(): ReactElement {
  const { boardSize } = useSelector((state: RootState) => ({
    boardSize: state.app.boardSize,
  }))

  function renderDots() {
    const dots = []

    for (let i = 0; i < boardSize; i ++) {
      dots.push(<Dot dotNumber={i} key={i} />)
    }

    return dots
  }

  return (
    <div className="board">
      {renderDots()}
    </div>
  )
}

export default Board
