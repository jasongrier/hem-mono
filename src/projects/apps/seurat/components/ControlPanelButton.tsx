import React, { ReactElement } from 'react'

interface IProps {
  className?: string
  icon: string
  onClick: () => void
}

function ControlPanelButton({ className, icon, onClick }: IProps): ReactElement {
  return (
    <button
      className={`control-panel__button ${className}`}
      onClick={onClick}
    >
      <i className={`tmp-icon tmp-icon--${icon}`}></i>
    </button>
  )
}

export default ControlPanelButton
