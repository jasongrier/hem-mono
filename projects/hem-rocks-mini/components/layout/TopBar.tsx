import React, { ReactElement } from 'react'
import { Logo } from './index'

interface IProps {
  collapsed: boolean
}

function TopBar({ collapsed }: IProps): ReactElement {
  return (
    <header className={`
      top-bar
      ${ true ? ' top-bar-collapsed' : '' }
    `}>
      <Logo />
    </header>
  )
}

export default TopBar
