import React, { ReactElement, useState } from 'react'
import { noop } from 'lodash'

interface IProps {
  className?: string
  disabled?: boolean
  hidden?: boolean
  icon: string
  iconClassName?: string
  onClick: () => void
  selected: boolean
}

function IconButton({ className, disabled, hidden, icon, iconClassName, onClick, selected }: IProps): ReactElement {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      className={`
        icon-button
          ${className ? ' ' + className : ''}
          ${disabled ? ' icon-button--disabled' : ''}
          ${hidden ? ' icon-button--hidden' : ''}
          ${pressed ? 'icon-button--pressed' : ''}
          ${selected ? ' icon-button--selected' : ''}
      `}
      onClick={!disabled ? onClick : noop}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <i className={`
        icon-button__icon
          icon-button__icon--${icon}
          ${iconClassName ? ' ' + iconClassName : ''}
      `}></i>
    </button>
  )
}

export default IconButton
