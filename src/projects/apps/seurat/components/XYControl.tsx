import React, { ReactElement, MutableRefObject, SyntheticEvent, useRef, useState } from 'react'
import { CursorGroup } from '../store/types'

interface IVal {
  x: number
  y: number
}

interface IProps {
  color: CursorGroup
  sendVal: (val: IVal) => void
}

function getValFromMousePos(el: MutableRefObject<null>, evt: any): IVal {
  const rect = (el.current as any).getBoundingClientRect()
  const x = (evt.nativeEvent.clientX - rect.left) / rect.width
  const y = (((evt.nativeEvent.clientY - rect.top) / rect.height) - 1) * -1

  return {
    x: x < 0 ? 0 : x > 1 ? 1 : x,
    y: y < 0 ? 0 : y > 1 ? 1 : y,
  }
}

function toPercent(value: number) {
  return (value * 100) + '%'
}

function XYControl({ color, sendVal }: IProps): ReactElement {
  const el = useRef(null)
  const [val, setVal] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  function setValAndSend(val: IVal) {
    setVal(val)
    sendVal(val)
  }

  function onMouseDown(evt: SyntheticEvent<HTMLDivElement>) {
    setDragging(true)
    setValAndSend(getValFromMousePos(el, evt))
  }

  function onMouseMove(evt: SyntheticEvent<HTMLDivElement>) {
    if (!dragging) return
    setValAndSend(getValFromMousePos(el, evt))
  }

  function onMouseUp() {
    setDragging(false)
  }

  function onMouseOut() {
    setDragging(false)
  }

  function onHandleMouseDown() {

  }

  function onHandleMouseUp() {

  }

  return (
    <div className={`x-y-control x-y-control--${color}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseOut={onMouseOut}
      ref={el}
    >
      <div className='x-y-control__handle'
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
