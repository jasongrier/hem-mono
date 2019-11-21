import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Dot from './Dot'

function renderDots(canvasSize: number) {
  const dots = []

  for (let i = 0; i < canvasSize; i ++) {
    dots.push(<Dot dotNumber={i} key={i} />)
  }

  return dots
}

function Canvas(): ReactElement {
  const { canvasSize } = useSelector((state: RootState) => ({
    canvasSize: state.app.canvases[state.app.currentCanvasIndex].dots.length,
  }))

  return (
    <div className="canvas">
      <div className="canvas__inner">
        {renderDots(canvasSize)}
      </div>
    </div>
  )
}

export default Canvas
