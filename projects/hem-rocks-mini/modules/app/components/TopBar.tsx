import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { expandTopBar } from '../index'

interface IProps {
  collapsed: boolean
}

function TopBar({ collapsed }: IProps): ReactElement {
  const dispatch = useDispatch()

  return (
    <header className={`
      top-bar
      ${ collapsed ? ' top-bar-collapsed' : '' }
    `}>
      <h1
        className="logo"
        onClick={() => dispatch(expandTopBar())}
      >
        <Link to="/">HEM</Link>
      </h1>
    </header>
  )
}

export default TopBar
