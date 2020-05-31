import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { Logo } from './index'

interface IProps {
  collapsed: boolean
}

function TopBar({ collapsed }: IProps): ReactElement {
  const dispatch = useDispatch()

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
