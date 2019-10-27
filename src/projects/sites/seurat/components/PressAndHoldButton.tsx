import React, { ReactElement, useState } from 'react'
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

  let holdTimeout: number

  return (
    <div className="press-and-hold-button">
      <IconButton
        disabled={disabled}
        hidden={hidden}
        emphasised={emphasised}
        icon={icon}
        selected={selected}
        onMouseDown={() => {
            if (disabled) return

            holdTimeout = window.setTimeout(() => {
              setClickDisabled(true)
              onHold()
            }, 2000)
        }}
        onMouseUp={() => {
            clearTimeout(holdTimeout)
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
