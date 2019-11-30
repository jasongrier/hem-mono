import React, { ReactElement, useRef, useEffect } from 'react'
import uuid from 'uuid/v1'
import { coords } from '../functions'

interface IProps {
  direction?: 'horizontal' | 'vertical'
  id?: string
  onChange?: (value: number) => void
  onChangeDone?: () => void
  readOnly?: boolean
  value?: number
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
  id = uuid(),
  onChange,
  onChangeDone,
  readOnly = false,
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

  function getValueFromMouseCoords(evt) {
    const mouse = coords(evt, el)
    return direction === 'vertical' ? mouse.y : mouse.x
  }

  function onMouseDown(evt: any) {
    if (readOnly) return
    evt.stopPropagation()
    win.dragging = id
    document.body.style.cursor = 'none'
    onChange(getValueFromMouseCoords(evt))
  }

  function onMouseMove(evt: any) {
    if (readOnly || win.dragging !== id) return
    evt.stopPropagation()
    onChange(getValueFromMouseCoords(evt))
  }

  function onMouseUp(evt: any) {
    if (win.dragging !== this.id) return
    evt.stopPropagation()
    win.dragging = undefined
    document.body.style.cursor = 'auto'
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
