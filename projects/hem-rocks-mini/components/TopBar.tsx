import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

interface IProps {
  collapsed: boolean
}

function TopBar({ collapsed }: IProps): ReactElement {
  return (
    <header className={`
      top-bar
      ${ collapsed ? ' top-bar-collapsed' : '' }
    `}>
      <h1
        className="logo"
        onClick={() => {
          $('html, body').stop().animate({ scrollTop: 0 }, 250, 'swing')
        }}
      >
        <Link to="/">HEM</Link>
      </h1>
    </header>
  )
}

export default TopBar
