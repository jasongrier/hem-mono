import React, { ReactElement } from 'react'

interface IProps {
  icon: string
  onClick: () => void
  selected: boolean
}

function IconButton({ icon, onClick, selected }: IProps): ReactElement {
  return (
    <button
      className={`icon-button ${selected ? ' icon-button--selected' : ''}`}
      onClick={onClick}
    >
      <i className={`icon-button__icon icon-button__icon--${icon}`}></i>
    </button>
  )
}

export default IconButton
