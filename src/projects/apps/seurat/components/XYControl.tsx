import React, { ReactElement, MutableRefObject, SyntheticEvent, useRef, useState } from 'react'
import { noop } from 'lodash'
import { CursorGroup } from '../store/types'

export interface IVal {
  x: number
  y: number
}

interface IProps {
  color: CursorGroup
  x?: number
  y?: number
  disabled?: boolean
  onDisabledClick?: () => void
  sendVal: (value: IVal) => void
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

function XYControl({ color, x = 0, y = 0, disabled = false, onDisabledClick = noop, sendVal }: IProps): ReactElement {
  const el = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [pressed, setPressed] = useState(false)

  function onMouseDown(evt: SyntheticEvent<HTMLDivElement>) {
    if (disabled) {
      onDisabledClick()
    }

    else {
      setDragging(true)
      setPressed(true)
      sendVal(getValFromMousePos(el, evt))
    }
  }

  function onMouseMove(evt: SyntheticEvent<HTMLDivElement>) {
    if (disabled) return
    if (!dragging) return
    sendVal(getValFromMousePos(el, evt))
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
          bottom: toPercent(y),
          left: toPercent(x),
        }}
      />
    </div>
  )
}

export default XYControl
