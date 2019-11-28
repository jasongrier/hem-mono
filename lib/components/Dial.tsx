import React, { ReactElement, useEffect, useRef, useState } from 'react'
import uuid from 'uuid/v1'

//@ts-ignore
import * as Nexus from 'nexusui'

// TODO: Draggging IFace for window
const win = window as any

interface IProps {
  className?: string
  color?: string
  label?: string
  onChange: (value: number) => void
  onChangeDone: (value: number) => void
  // TODO: Stop our Nexus fork from eating mouse events
  onPress?: () => void
  overflowHack?: number
  size?: number
  value?: number
}

let stateValueProxy: number

function Dial({ className, color, label, onChange, onChangeDone, onPress, overflowHack = 17, size = 49, value: propsValue = 0 }: IProps): ReactElement {
  const id = uuid()
  const dial = React.useRef<null | Nexus.Dial>(null)
  const el = React.useRef<null | HTMLDivElement>(null)

  const [stateValue, setStateValue] = useState(propsValue)

  useEffect(() => {
    if (!el || !el.current) return

    dial.current = new Nexus.Dial(id, {
      interaction: 'vertical',
      mode: 'relative',
      // TODO: This is hardcoded in index.css as well
      size: [size, size],
    })

    dial.current.handleLine.style.display = 'none'

    dial.current.colorize('accent', color || window.getComputedStyle(el.current).backgroundColor)
    dial.current.colorize('fill', '#111')

    dial.current.handle.setAttribute('stroke-width', overflowHack)
    dial.current.handle2.setAttribute('stroke-width', overflowHack)

    // TODO: Fix event name in our Nexus fork
    dial.current.on('click', onMouseDown)
    dial.current.on('release', onMouseUp)
    dial.current.on('change', (value: number) => {
      win.dragging = id
      onChange(value)
      setStateValue(value)
    })

    win.addEventListener('mouseup', onMouseUp)

    return function destroy() {
      dial.current.destroy()
      win.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  useEffect(() => { stateValueProxy = stateValue }, [stateValue])

  useEffect(() => {
    if (dial.current === null) return
    if (propsValue === undefined) return

    setStateValue(propsValue)
    dial.current.value = propsValue
  }, [propsValue])

  function onMouseDown() {
    if (!el || !el.current) return
    win.dragging = id
    document.body.classList.add('no-cursor')
    el.current.classList.add('dial--pressed')
    onPress()
  }

  function onMouseUp() {
    if (!el || !el.current) return
    if (win.dragging !== id) return
    win.dragging = undefined
    document.body.classList.remove('no-cursor')
    el.current.classList.remove('dial--pressed')
    onChangeDone(stateValueProxy)
  }

  return (
    <div
      className={`
        dial
          ${label ? ' dial--with-label' : ''}
          ${className ? className : ''}
      `}
      ref={el}
    >
      <div
        className="dial__ui"
        id={id}
      />
      <div className="dial__hub">
        {label && (
          <div
            className="dial__label"
            id={id}
          />
        )}
      </div>
    </div>
  )
}

export default Dial
