import React, { ReactElement, useState } from 'react'
import { noop } from 'lodash'

interface IProps {
  className?: string
  disabled?: boolean
  emphasised?: boolean
  hidden?: boolean
  icon: string
  iconClassName?: string
  onClick?: () => void
  onMouseDown?: () => void
  onMouseUp?: () => void
  selected: boolean
}

function IconButton({ className, disabled, emphasised, hidden, icon, iconClassName, onClick, onMouseDown, onMouseUp, selected }: IProps): ReactElement {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      className={`
        icon-button
          ${className ? ' ' + className : ''}
          ${disabled ? ' icon-button--disabled' : ''}
          ${emphasised ? ' icon-button--emphasised' : ''}
          ${hidden ? ' icon-button--hidden' : ''}
          ${pressed ? 'icon-button--pressed' : ''}
          ${selected ? ' icon-button--selected' : ''}
      `}
      onClick={!disabled ? onClick : noop}
      onMouseDown={() => {
        onMouseDown && onMouseDown()
        setPressed(true)
      }}
      onMouseUp={() => {
        onMouseUp && onMouseUp()
        setPressed(false)
      }}
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
