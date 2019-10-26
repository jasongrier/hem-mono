import React, { ReactElement, useState } from 'react'

interface IProps {
  className?: string
  icon: string
  iconClassName?: string
  onClick: () => void
  selected: boolean
}

function IconButton({ className, icon, iconClassName, onClick, selected }: IProps): ReactElement {
  const [pressed, setPressed] = useState(false)

  return (
    <button
      className={`
        icon-button
          ${pressed ? 'icon-button--pressed' : ''}
          ${selected ? ' icon-button--selected' : ''}
          ${className ? ' ' + className : ''}
      `}
      onClick={onClick}
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
