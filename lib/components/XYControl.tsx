import React, { ReactElement, MutableRefObject, SyntheticEvent, useRef, useState } from 'react'
import { noop } from 'lodash'

export interface IXYVal {
  x: number
  y: number
}

interface IProps {
  x?: number
  y?: number
  disabled?: boolean
  invert?: boolean
  onDisabledClick?: () => void
  sendVal: (value: IXYVal) => void
}

function getValFromMousePos(el: MutableRefObject<null>, evt: any, invert: boolean = true): IXYVal {
  const rect = (el.current as any).getBoundingClientRect()
  const x = (evt.nativeEvent.clientX - rect.left) / rect.width
  let y = (evt.nativeEvent.clientY - rect.top) / rect.height
  y = invert ? (y - 1) * -1 : y

  return {
    x: x < 0 ? 0 : x > 1 ? 1 : x,
    y: y < 0 ? 0 : y > 1 ? 1 : y,
  }
}

function toPercent(value: number) {
  return (value * 100) + '%'
}

function XYControl({ x = 0, y = 0, disabled = false, invert = true, onDisabledClick = noop, sendVal }: IProps): ReactElement {
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
      sendVal(getValFromMousePos(el, evt, invert))
    }
  }

  function onMouseMove(evt: SyntheticEvent<HTMLDivElement>) {
    if (disabled) return
    if (!dragging) return
    sendVal(getValFromMousePos(el, evt, invert))
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
    <div className={`x-y-control ${pressed ? 'x-y-control--pressed' : ''}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
      onMouseUp={onMouseUp}
      ref={el}
    >
      <div className="x-y-control__handle"
        style={{
          bottom: toPercent(invert ? y : (y - 1) * -1),
          left: toPercent(x),
        }}
      />
    </div>
  )
}

export default XYControl
