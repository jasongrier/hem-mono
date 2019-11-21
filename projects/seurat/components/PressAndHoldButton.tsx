import React, { ReactElement, useState, useEffect } from 'react'
import IconButton from './IconButton'

interface IProps {
  disabled: boolean
  emphasised?: boolean
  hidden: boolean
  icon: string
  onClick: () => void
  onHold: () => void
  selected: boolean
}

function PressAndHoldButton({ disabled, emphasised, hidden, icon, onClick, onHold, selected }: IProps): ReactElement {
  const [clickDisabled, setClickDisabled] = useState(false)
  const [flash, setFlash] = useState(false)

  let holdTimeout: number
  let flashTimeout: number

  return (
    <div className={`press-and-hold-button ${flash ? ' press-and-hold-button--flashing' : ''}`}>
      <IconButton
        disabled={disabled}
        hidden={hidden}
        emphasised={emphasised}
        icon={icon}
        selected={selected}
        onMouseDown={() => {
            if (disabled) return

            holdTimeout = window.setTimeout(() => {
              setFlash(true)
              flashTimeout = window.setTimeout(() => {
                setFlash(false)
                setClickDisabled(true)
                onHold()
              }, 1000)
            }, 1000)
        }}
        onMouseUp={() => {
            clearTimeout(holdTimeout)
            clearTimeout(flashTimeout)
            setFlash(false)

            if (disabled) return

            if (clickDisabled) {
              setClickDisabled(false)
            }

            else {
              onClick()
            }
        }}
        />
    </div>
  )
}

export default PressAndHoldButton
