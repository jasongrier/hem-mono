import React, { ReactElement, useRef, useEffect } from 'react'
import uuid from 'uuid/v1'
import { coords } from '../functions'

interface IProps {
  direction?: 'horizontal' | 'vertical'
  hideCursor?: boolean
  id?: string
  onChangeDone?: () => void
  onMouseDown?: () => void
  onMouseUp?: () => void
  readOnly?: boolean

  onChange: (value: number) => void
  value: number
}

const win: any = window

const styleSheet = `
  .hem-slider {
    position: relative;
    width: 200px;
    height: 20px;
    border: 1px solid black;
    box-sizing: border-box;
    user-select: none;
  }

  .hem-slider * {
    user-select: none;
  }

  .hem-slider-progress {
    position: absolute;
    left: 0;
    height: 100%;
    background: black;
  }

  .horizontal .hem-slider-progress {
    top: 0;
  }

  .vertical .hem-slider-progress {
    top: auto;
    bottom: 0;
  }
`

function Slider({
  direction = 'horizontal',
  hideCursor = false,
  onChangeDone,
  onMouseDown: fwdOnMouseDown,
  onMouseUp: fwdOnMouseUp,
  readOnly = false,

  id,
  onChange,
  value,
}: IProps): ReactElement {
  const el = useRef(null)

  useEffect(() => {
    win.addEventListener('mousemove', onMouseMove)
    win.addEventListener('mouseup', onMouseUp)

    return function cleanup() {
      win.removeEventListener('mousemove', onMouseMove)
      win.removeEventListener('mouseup', onMouseUp)
    }
  })

  function getValueFromMouseCoords(evt: any) {
    const mouse = coords(evt, el.current)
    return direction === 'vertical' ? mouse.y : mouse.x
  }

  function onMouseDown(evt: any) {
    fwdOnMouseDown && fwdOnMouseDown()
    if (readOnly) return
    evt.stopPropagation()
    win.dragging = id
    hideCursor && (document.body.style.cursor = 'none')
    onChange && onChange(getValueFromMouseCoords(evt))
  }

  function onMouseMove(evt: any) {
    if (readOnly) return
    if (win.dragging !== id) return
    evt.stopPropagation()
    onChange && onChange(getValueFromMouseCoords(evt))
  }

  function onMouseUp(evt: any) {
    fwdOnMouseUp && fwdOnMouseUp()
    if (win.dragging !== id) return
    evt.stopPropagation()
    win.dragging = undefined
    hideCursor && (document.body.style.cursor = 'auto')
    onChangeDone && onChangeDone()
  }

  let progressStyle

  if (direction === 'vertical') {
    progressStyle = {
      height: `${value * 100}%`
    }
  }

  else {
    progressStyle = {
      width: `${value * 100}%`
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className="hem-slider"
        onMouseDown={onMouseDown}
        ref={el}
      >
        <div
          className="hem-slider-progress"
          style={progressStyle}
        />
      </div>
    </>
  )
}

export default Slider
