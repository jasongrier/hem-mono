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
    canvasSize: state.app.canvases[state.app.currentCanvas].dots.length,
  }))

  return (
    <div className={`canvas canvas--${canvasSize}`}>
      {renderDots(canvasSize)}
    </div>
  )
}

export default Canvas
