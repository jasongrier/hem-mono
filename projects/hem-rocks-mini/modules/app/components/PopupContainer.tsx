import React, { ReactElement, PropsWithChildren, SFC } from 'react'

interface IProps {
  isOpen: boolean
}

function PopupContainer({ children, isOpen }: PropsWithChildren<IProps>): ReactElement {
  return (
    <div className={`
      'pop-up-container'
      ${isOpen ? ' pop-up-container-open' : ''}
    `}>
      { children({}) }
    </div>
  )
}

export default PopupContainer
