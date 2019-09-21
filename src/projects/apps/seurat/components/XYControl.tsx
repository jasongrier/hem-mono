import React, { ReactElement, useState } from 'react'
import { CursorGroup } from '../store/types'

interface IProps {
  color: CursorGroup
}

function onMouseDown() {

}

function onMouseMove() {

}

function onHandleMouseDown() {

}

function onHandleMouseUp() {

}

function toPercent(value: number) {
  return (value * 100) + '%'
}

function XYControl({ color }: IProps): ReactElement {
  const [val, setVal] = useState({ x: 0, y: 0 })

  return (
    <div className={`x-y-control x-y-control--${color}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      <div className="x-y-control__handle"
        onMouseDown={onHandleMouseDown}
        onMouseUp={onHandleMouseUp}
        style={{
          bottom: toPercent(val.y),
          left: toPercent(val.x),
        }}
      />
    </div>
  )
}

export default XYControl
