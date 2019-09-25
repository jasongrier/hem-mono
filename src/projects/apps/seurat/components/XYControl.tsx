import React, { ReactElement, MutableRefObject, SyntheticEvent, useRef, useState } from 'react'
import { noop } from 'lodash'
import { CursorGroup } from '../store/types'

interface IVal {
  x: number
  y: number
}

interface IProps {
  color: CursorGroup
  disabled?: boolean
  onDisabledClick?: () => void
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

function XYControl({ color, disabled = false, onDisabledClick = noop, sendVal }: IProps): ReactElement {
  const el = useRef(null)
  const [val, setVal] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [pressed, setPressed] = useState(false)

  function setValAndSend(val: IVal) {
    setVal(val)
    sendVal(val)
  }

  function onMouseDown(evt: SyntheticEvent<HTMLDivElement>) {
    if (disabled) {
      onDisabledClick()
    }

    else {
      setDragging(true)
      setPressed(true)
      setValAndSend(getValFromMousePos(el, evt))
    }
  }

  function onMouseMove(evt: SyntheticEvent<HTMLDivElement>) {
    if (disabled) return
    if (!dragging) return
    setValAndSend(getValFromMousePos(el, evt))
  }

  function onMouseUp() {
    if (disabled) return
    setDragging(false)
    setPressed(false)
  }

  function onMouseOut() {
    if (disabled) return
    setDragging(false)
  }

  return (
    <div className={`x-y-control x-y-control--${color} ${pressed ? 'x-y-control--pressed' : ''}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseOut={onMouseOut}
      ref={el}
    >
      <div className='x-y-control__handle'
        style={{
          bottom: toPercent(val.y),
          left: toPercent(val.x),
        }}
      />
    </div>
  )
}

export default XYControl
